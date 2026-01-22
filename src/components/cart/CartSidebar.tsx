import { Link, useNavigate } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

export function CartSidebar() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    total,
    itemCount,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setIsCartOpen(false);

    const token = localStorage.getItem("authToken");

    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=/checkout");
    }
  };

  const handleViewCartClick = () => {
    setIsCartOpen(false);
    navigate("/cart");
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-foreground/50 z-50 transition-opacity",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsCartOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[420px] bg-background z-50 shadow-2xl transition-transform flex flex-col",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Your Cart</h2>
            {itemCount > 0 && (
              <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                {itemCount}
              </span>
            )}
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-muted rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center space-y-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button asChild variant="outline">
                <Link to="/shop" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-card rounded-xl border"
                >
                  <div className="h-20 w-20 bg-muted rounded-lg flex items-center justify-center">
                    🍪
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                    <p className="font-semibold text-primary mt-1">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-8 w-8 bg-muted rounded-full"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="w-8 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-8 w-8 bg-muted rounded-full"
                      >
                        <Plus size={14} />
                      </button>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto h-8 w-8 rounded-full hover:bg-destructive/10"
                      >
                        <Trash2 size={14} className="text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleViewCartClick}>
                View Cart
              </Button>

              <Button
                onClick={handleCheckoutClick}
                className="bg-gradient-to-r from-[#7b0000] to-[#b30000] text-white h-12"
              >
                Checkout →
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
