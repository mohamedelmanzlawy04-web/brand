import { Link, useLocation } from "wouter";
import { ShoppingBag, Heart, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "./theme-provider";
import { CartDrawer } from "./cart-drawer";
import { useGetCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { getSessionId } from "@/lib/session";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";

  const sessionId = getSessionId();
  const { data: cart } = useGetCart({ sessionId }, {
    query: {
      queryKey: getGetCartQueryKey({ sessionId }),
    },
  });

  const cartItemsCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header
      className={`w-full z-[200] transition-colors duration-300 ${
        isHome
          ? "absolute top-0 left-0 right-0 border-b border-white/10 bg-transparent"
          : "sticky top-0 border-b bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className={`font-serif text-2xl font-bold tracking-tight ${isHome ? "text-white" : ""}`}>
            TIDAL
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/products" className={`text-sm font-medium transition-colors ${isHome ? "text-white/80 hover:text-white" : "hover:text-primary"}`}>
              Shop
            </Link>
            <Link href="/products?featured=true" className={`text-sm font-medium transition-colors ${isHome ? "text-white/80 hover:text-white" : "hover:text-primary"}`}>
              Collections
            </Link>
            <Link href="#about" className={`text-sm font-medium transition-colors ${isHome ? "text-white/80 hover:text-white" : "hover:text-primary"}`}>
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`p-2 transition-colors ${isHome ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
            data-testid="button-theme-toggle"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <Link href="/wishlist" className={`p-2 transition-colors hidden sm:block ${isHome ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}>
            <Heart size={20} />
          </Link>

          <button
            className={`relative p-2 transition-colors ${isHome ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setIsCartOpen(true)}
            data-testid="button-cart-drawer"
          >
            <ShoppingBag size={20} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartItemsCount}
              </span>
            )}
          </button>

          <button
            className={`p-2 md:hidden transition-colors ${isHome ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`md:hidden border-t px-4 py-4 ${isHome ? "bg-black/60 backdrop-blur-md border-white/10" : "bg-background"}`}>
          <nav className="flex flex-col gap-4">
            <Link href="/products" className={`text-sm font-medium ${isHome ? "text-white" : ""}`} onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link href="/products?featured=true" className={`text-sm font-medium ${isHome ? "text-white" : ""}`} onClick={() => setIsMenuOpen(false)}>Collections</Link>
            <Link href="/wishlist" className={`text-sm font-medium ${isHome ? "text-white" : ""}`} onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
          </nav>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-muted py-12 px-4 md:px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-serif text-xl font-bold mb-4">TIDAL</h3>
          <p className="text-muted-foreground text-sm">
            Premium beach lifestyle clothing. Born by the ocean.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
            <li><Link href="/products?category=t-shirts" className="hover:text-primary transition-colors">T-Shirts</Link></li>
            <li><Link href="/products?category=swimwear" className="hover:text-primary transition-colors">Swimwear</Link></li>
            <li><Link href="/products?category=accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Subscribe for updates and exclusive offers.
          </p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button className="h-10 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
        <p>&copy; {new Date().getFullYear()} TIDAL. All rights reserved.</p>
        <Link href="/admin" className="text-muted-foreground/50 hover:text-muted-foreground mt-4 md:mt-0 text-xs">Admin</Link>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isHome = location === "/";

  if (isHome) {
    return (
      <div className="relative h-[100dvh] overflow-hidden">
        <Navbar />
        <main className="h-full">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
