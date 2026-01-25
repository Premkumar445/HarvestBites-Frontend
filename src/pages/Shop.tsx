import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { products, comboPacks } from "@/data/products";
import type { Product } from "../types/product";
import { ShoppingBag, Star, Leaf, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function Shop() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const handleAddToCart = (product: Product, qty: number = 1) => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    toast({
      title: `${qty}x Added to cart!`,
      description: `${product.name} added successfully.`,
    });
  };

  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities(prev => {
      const current = prev[productId] || 0;
      return { ...prev, [productId]: Math.max(0, current + change) };
    });
  };

  const getQuantity = (productId: number) => quantities[productId] || 0;

  const renderProductCard = (product: Product, keyPrefix = "") => {
    const qty = getQuantity(product.id);

    return (
      <div
        key={`${keyPrefix}${product.id}`}
        className="bg-card border border-gray-200 rounded-none overflow-hidden shadow-sm hover:shadow-md transition-all group"
      >
        {/* IMAGE – WHITE SPACE FIXED */}
        <Link to={`/product/${product.id}`}>
          <div className="aspect-[4/3] bg-white overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Leaf className="h-20 w-20 text-primary" />
              </div>
            )}
          </div>
        </Link>

        <div className="p-3 space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-emerald-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
              <Star className="h-3 w-3 fill-white" />
              {product.rating}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.reviews} reviews
            </span>
          </div> <br></br>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold leading-tight line-clamp-2 hover:text-primary">
              {product.name}
            </h3>
          </Link>

          {/* Price + Quantity */}
          <div className="flex items-end justify-between pt-1">
            <span className="text-lg font-bold">₹{product.price}</span>

            <div className="flex items-center bg-white border border-gray-300 rounded-lg px-1 py-1 min-w-[90px]">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(product.id, -1);
                }}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="w-10 text-center font-semibold text-sm">
                {qty}
              </span>

              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleQuantityChange(product.id, 1);
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            className="w-full h-9 bg-gradient-to-b from-[#7b0000] to-[#b30000] hover:from-[#8c0000] hover:to-[#cc0000] text-white text-xs font-semibold rounded-none flex items-center justify-center gap-2 mt-2"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product, qty || 1);
            }}
          >
            <ShoppingBag className="h-4 w-4" />
            {qty > 0 ? `ADD ${qty}` : "ADD TO CART"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {/* Products */}
      <section className="py-8 bg-[#fffffe]">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-2xl font-semibold">Products</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map(product => renderProductCard(product))}
          </div>
        </div>
      </section>

      {/* Combo */}
      <section className="py-8 bg-[#fffffe]">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-semibold">Combo Packs</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {comboPacks.map(product =>
              renderProductCard(product, "combo-")
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
