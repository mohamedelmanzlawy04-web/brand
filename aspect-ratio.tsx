import { Link } from "wouter";
import { Product } from "@workspace/api-client-react";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useAddToCart, useAddToWishlist, getGetCartQueryKey, getGetWishlistQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getSessionId } from "@/lib/session";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const sessionId = getSessionId();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addToCart = useAddToCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey({ sessionId }) });
        toast({
          title: "Added to cart",
          description: `${product.name} added to your cart.`,
        });
      }
    }
  });

  const addToWishlist = useAddToWishlist({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetWishlistQueryKey({ sessionId }) });
        toast({
          title: "Added to wishlist",
          description: `${product.name} saved for later.`,
        });
      }
    }
  });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart.mutate({
      data: {
        sessionId,
        productId: product.id,
        quantity: 1,
        size: product.sizes?.[0] || "M",
        color: product.colors?.[0] || "Default",
      }
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist.mutate({
      data: {
        sessionId,
        productId: product.id,
      }
    });
  };

  const mainImage = product.images?.[0] || "https://placehold.co/600x800/e2e8f0/808080?text=TIDAL";
  const hoverImage = product.images?.[1] || mainImage;

  return (
    <Link href={`/products/${product.id}`} className="group block w-full">
      <div 
        className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-muted"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={isHovered ? hoverImage : mainImage}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isFeatured && (
            <span className="bg-primary/90 text-primary-foreground text-xs font-bold px-2 py-1 rounded">
              FEATURED
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-secondary/90 text-secondary-foreground text-xs font-bold px-2 py-1 rounded">
              BEST SELLER
            </span>
          )}
        </div>

        {/* Quick actions overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : ''} flex gap-2`}>
          <button 
            onClick={handleAddToCart}
            disabled={addToCart.isPending}
            className="flex-1 bg-background/95 hover:bg-background text-foreground py-3 px-4 flex items-center justify-center gap-2 rounded-md font-medium text-sm backdrop-blur-sm shadow-sm transition-colors disabled:opacity-50"
          >
            <ShoppingBag size={16} />
            <span>Add</span>
          </button>
          <button 
            onClick={handleAddToWishlist}
            disabled={addToWishlist.isPending}
            className="bg-background/95 hover:bg-background text-foreground p-3 flex items-center justify-center rounded-md backdrop-blur-sm shadow-sm transition-colors disabled:opacity-50"
          >
            <Heart size={16} />
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-1">
        <h3 className="font-serif font-medium text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm font-medium">
          ${product.price.toFixed(2)}
        </p>
        
        {/* Colors quick view */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1 mt-2 pt-1">
            {product.colors.slice(0, 4).map((color, idx) => (
              <span 
                key={idx} 
                className="w-3 h-3 rounded-full border border-border"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-muted-foreground flex items-center">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
