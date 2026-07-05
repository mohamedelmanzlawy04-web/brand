import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useGetCart, useUpdateCartItem, useRemoveFromCart, getGetCartQueryKey } from "@workspace/api-client-react";
import { getSessionId } from "@/lib/session";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const sessionId = getSessionId();
  const queryClient = useQueryClient();
  
  const { data: cart, isLoading } = useGetCart({ sessionId }, { 
    query: { 
      queryKey: getGetCartQueryKey({ sessionId }),
      enabled: isOpen
    } 
  });

  const updateCartItem = useUpdateCartItem({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey({ sessionId }) });
      }
    }
  });

  const removeFromCart = useRemoveFromCart({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetCartQueryKey({ sessionId }) });
      }
    }
  });

  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItem.mutate({
      id: itemId,
      data: { quantity: newQuantity }
    });
  };

  const handleRemove = (itemId: number) => {
    removeFromCart.mutate({ id: itemId });
  };

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()} direction="right">
      <DrawerContent className="h-full w-full sm:w-[400px] mt-0 rounded-none fixed right-0 left-auto bottom-0 top-0 flex flex-col focus:outline-none">
        <DrawerHeader className="border-b flex justify-between items-center py-4 px-6 text-left">
          <DrawerTitle className="font-serif text-2xl font-bold">Your Cart</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
              <X size={20} />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : cart?.items?.length === 0 || !cart ? (
            <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                <span className="text-2xl">0</span>
              </div>
              <h3 className="text-xl font-medium">Your cart is empty</h3>
              <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
              <Button onClick={onClose} className="mt-4" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            cart.items.map((item) => (
              <div key={item.id} className="flex gap-4 items-start">
                <div className="h-24 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  {item.product.images?.[0] && (
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium text-sm leading-tight">{item.product.name}</h4>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors ml-2"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-0.5">
                    {item.color && <p>Color: {item.color}</p>}
                    {item.size && <p>Size: {item.size}</p>}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border rounded-md border-input h-8">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        className="px-2 h-full text-muted-foreground hover:text-foreground"
                        disabled={item.quantity <= 1 || updateCartItem.isPending}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 h-full text-muted-foreground hover:text-foreground"
                        disabled={updateCartItem.isPending}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <div className="border-t p-6 bg-background space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
            <Button className="w-full h-12 text-base font-medium" onClick={onClose} asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
