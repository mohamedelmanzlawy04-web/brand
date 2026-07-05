import { Router } from "express";
import { db, cartItemsTable, productsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { logger } from "../lib/logger";

const router = Router();

function parseProduct(p: any) {
  return {
    ...p,
    price: parseFloat(p.price),
    images: JSON.parse(p.images || "[]"),
    sizes: JSON.parse(p.sizes || "[]"),
    colors: JSON.parse(p.colors || "[]"),
  };
}

async function buildCart(sessionId: string) {
  const items = await db
    .select()
    .from(cartItemsTable)
    .leftJoin(productsTable, eq(cartItemsTable.productId, productsTable.id))
    .where(eq(cartItemsTable.sessionId, sessionId));

  const cartItems = items.map((row) => ({
    ...row.cart_items,
    product: row.products ? parseProduct(row.products) : null,
  }));

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product ? item.product.price * item.quantity : 0);
  }, 0);

  return {
    sessionId,
    items: cartItems,
    subtotal: Math.round(subtotal * 100) / 100,
    total: Math.round(subtotal * 100) / 100,
  };
}

router.get("/", async (req, res) => {
  try {
    const { sessionId } = req.query as { sessionId: string };
    if (!sessionId) return res.status(400).json({ error: "sessionId required" });
    const cart = await buildCart(sessionId);
    res.json(cart);
  } catch (err) {
    logger.error(err, "Error getting cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { sessionId, productId, quantity = 1, size, color } = req.body;
    if (!sessionId || !productId) return res.status(400).json({ error: "sessionId and productId required" });

    const existing = await db
      .select()
      .from(cartItemsTable)
      .where(and(
        eq(cartItemsTable.sessionId, sessionId),
        eq(cartItemsTable.productId, productId),
        eq(cartItemsTable.size, size),
        eq(cartItemsTable.color, color),
      ));

    if (existing.length > 0) {
      await db.update(cartItemsTable)
        .set({ quantity: existing[0].quantity + quantity })
        .where(eq(cartItemsTable.id, existing[0].id));
    } else {
      await db.insert(cartItemsTable).values({ sessionId, productId, quantity, size, color });
    }

    const cart = await buildCart(sessionId);
    res.json(cart);
  } catch (err) {
    logger.error(err, "Error adding to cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:sessionId/items/:productId", async (req, res) => {
  try {
    const { sessionId, productId } = req.params;
    const { quantity, size, color } = req.body;

    const existing = await db
      .select()
      .from(cartItemsTable)
      .where(and(eq(cartItemsTable.sessionId, sessionId), eq(cartItemsTable.productId, parseInt(productId))))
      .limit(1);

    if (!existing.length) return res.status(404).json({ error: "Cart item not found" });

    if (quantity <= 0) {
      await db.delete(cartItemsTable).where(eq(cartItemsTable.id, existing[0].id));
    } else {
      const updateData: any = { quantity };
      if (size !== undefined) updateData.size = size;
      if (color !== undefined) updateData.color = color;
      await db.update(cartItemsTable).set(updateData).where(eq(cartItemsTable.id, existing[0].id));
    }

    const cart = await buildCart(sessionId);
    res.json(cart);
  } catch (err) {
    logger.error(err, "Error updating cart item");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:sessionId/items/:productId", async (req, res) => {
  try {
    const { sessionId, productId } = req.params;
    await db.delete(cartItemsTable)
      .where(and(eq(cartItemsTable.sessionId, sessionId), eq(cartItemsTable.productId, parseInt(productId))));
    const cart = await buildCart(sessionId);
    res.json(cart);
  } catch (err) {
    logger.error(err, "Error removing from cart");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
