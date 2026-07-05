import { Router } from "express";
import { db, ordersTable, productsTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "../lib/logger";

const ADMIN_PASSWORD = "12345";
const ADMIN_TOKEN = "tidal-admin-secret-token-2025";

const router = Router();

function parseOrder(o: any) {
  return {
    ...o,
    subtotal: parseFloat(o.subtotal),
    total: parseFloat(o.total),
    items: typeof o.items === "string" ? JSON.parse(o.items) : o.items,
    createdAt: o.createdAt instanceof Date ? o.createdAt.toISOString() : o.createdAt,
  };
}

router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    if (password !== ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.json({ success: true, token: ADMIN_TOKEN });
  } catch (err) {
    logger.error(err, "Error in admin login");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/stats", async (_req, res) => {
  try {
    const [orderCount, revenueResult, productCount, customerCount, recentOrders] = await Promise.all([
      db.select({ count: sql<number>`count(*)` }).from(ordersTable),
      db.select({ total: sql<number>`coalesce(sum(total::numeric), 0)` }).from(ordersTable),
      db.select({ count: sql<number>`count(*)` }).from(productsTable),
      db.select({ count: sql<number>`count(distinct customer_email)` }).from(ordersTable),
      db.select().from(ordersTable).orderBy(ordersTable.createdAt).limit(5),
    ]);

    res.json({
      totalOrders: Number(orderCount[0]?.count ?? 0),
      totalRevenue: parseFloat(String(revenueResult[0]?.total ?? 0)),
      totalProducts: Number(productCount[0]?.count ?? 0),
      totalCustomers: Number(customerCount[0]?.count ?? 0),
      recentOrders: recentOrders.map(parseOrder),
    });
  } catch (err) {
    logger.error(err, "Error fetching admin stats");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
