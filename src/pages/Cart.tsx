// src/pages/Cart.tsx - Mobile-First User-Friendly Version
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { 
  Plus, Minus, Trash2, ShoppingBag, ArrowRight, 
  Truck, Gift, Sparkles, Package, CheckCircle,
  Clock, CreditCard
} from "lucide-react";
import { allProducts } from "@/data/products";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();

  const getProductImage = (itemId: number) => {
    const product = allProducts.find((p) => p.id === itemId);
    return product?.image || "https://via.placeholder.com/160x160/F5F5F7/000000?text=BISCUIT";
  };

  const handleQuantityChange = (itemId: number, newQty: number) => {
    if (newQty < 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQty);
    }
  };

  const discount = items.reduce((sum, item) => sum + (item.price * 0.15 * item.quantity), 0);
  const savings = 50 + Math.round(discount);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen py-4 sm:py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile-First Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-4 sm:px-6">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                  <ShoppingBag className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
                    Your Cart ({items.length} items)
                  </h1>
                  {items.length > 0 && (
                    <p className="text-sm sm:text-base text-emerald-600 font-medium mt-1">
                      Total: ₹{total.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              {items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-red-300 text-red-700 hover:bg-red-50 font-semibold px-4 py-2 sm:px-6 sm:py-2.5 h-11 rounded-md shadow-sm hover:shadow-md w-full sm:w-auto"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16 sm:py-24 max-w-2xl mx-auto">
              <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-xl">
                <ShoppingBag className="h-20 sm:h-24 w-20 sm:w-24 text-gray-400" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed px-4">
                No items in your cart. Explore our delicious biscuits and start shopping!
              </p>
              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto max-w-sm h-14 bg-emerald-600 hover:bg-emerald-700 text-xl font-bold shadow-lg px-8"
              >
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Mobile Stacked Layout */}
              <div className="space-y-4 sm:space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
                {/* Cart Items - Full width on mobile */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                  {items.map((item) => (
                    <div 
                      key={item.id} 
                      className="bg-white border border-gray-200 rounded-2xl hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 overflow-hidden"
                    >
                      {/* Product Row - Mobile Stacked */}
                      <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:gap-6">
                          {/* Product Image - Mobile Full Width */}
                          <div className="relative w-full aspect-square sm:aspect-[4/3] lg:w-32 lg:h-32 lg:aspect-square flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 mb-4 lg:mb-0 group-hover:scale-105 transition-all duration-300 max-w-[200px] mx-auto lg:mx-0">
                            <img
                              src={getProductImage(item.id)}
                              alt={item.name}
                              className="w-full h-full object-cover hover:brightness-105 transition-all"
                              loading="lazy"
                            />
                            <Badge className="absolute top-2 left-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1">
                              In Stock
                            </Badge>
                          </div>

                          {/* Product Info - Mobile Full Width */}
                          <div className="flex-1 min-w-0 lg:py-2">
                            <Link
                              to={`/product/${item.id}`}
                              className="block text-lg sm:text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors mb-3 sm:mb-4 line-clamp-2 hover:underline text-center lg:text-left lg:text-base"
                            >
                              {item.name}
                            </Link>
                            
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 mb-4 sm:mb-6 text-sm px-2 lg:px-0">
                              <Sparkles className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
                                {item.benefit || 'Premium Quality'}
                              </span>
                              <span className="text-gray-600 text-center lg:text-left">{item.subtitle || 'Crispy & Delicious'}</span>
                            </div>

                            {/* Mobile: Price & Quantity Stacked */}
                            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6">
                              {/* Quantity Controls */}
                              <div className="flex items-center justify-center bg-gray-100 rounded-full p-1.5 w-full sm:w-auto group/quantity hover:bg-gray-200 transition-all sm:min-w-[200px]">
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="w-12 h-12 rounded-xl bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 flex items-center justify-center transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:scale-105 shadow-sm flex-shrink-0"
                                >
                                  <Minus className="h-5 w-5" />
                                </button>
                                <span className="px-4 sm:px-6 py-3 mx-2 font-bold text-lg text-gray-900 min-w-[4rem] text-center flex-shrink-0">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="w-12 h-12 rounded-xl bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 flex items-center justify-center transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:scale-105 shadow-sm flex-shrink-0"
                                >
                                  <Plus className="h-5 w-5" />
                                </button>
                              </div>

                              {/* Price */}
                              <div className="text-center lg:text-right min-w-[140px]">
                                <div className="text-2xl sm:text-3xl lg:text-2xl font-bold text-emerald-600 mb-1">
                                  ₹{(item.price * item.quantity).toLocaleString()}
                                </div>
                                <div className="text-base sm:text-lg font-normal text-gray-500 line-through">
                                  ₹{Math.round(item.price * 1.25 * item.quantity).toLocaleString()}
                                </div>
                                <Badge className="mt-1 bg-emerald-100 text-emerald-800 px-3 py-1 text-sm font-bold">
                                  {Math.round(item.price * 0.25 * item.quantity)}% OFF
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Delete Button - Always Visible on Mobile */}
                          
                        </div>
                      </div>

                      {/* Product Footer */}
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 sm:pt-4 border-t border-gray-200 bg-gray-50">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                          <div className="flex items-center gap-2 sm:gap-4 text-gray-600 mb-2 sm:mb-0">
                            <Truck className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                            <span className="font-medium">Free Delivery</span>
                          </div>
                          <Link 
                            to={`/product/${item.id}`} 
                            className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm text-center sm:text-right"
                          >
                            View Details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary - Mobile Full Width */}
                <div className="lg:col-span-1 lg:sticky lg:top-32 lg:self-start">
                  <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200 text-center lg:text-left">
                      Order Summary
                    </h3>

                    {/* Price Details */}
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between py-3 border-b border-gray-100 text-sm sm:text-base">
                        <span className="font-semibold text-gray-700">
                          Items ({items.length}):
                        </span>
                        <span className="font-bold text-gray-900">₹{total.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                        <span className="text-emerald-700 font-semibold flex items-center gap-2 text-sm sm:text-base">
                          <Truck className="h-5 w-5" />
                          Delivery
                        </span>
                        <Badge className="bg-emerald-500 text-white font-bold px-3 sm:px-4 py-2 shadow-md text-xs sm:text-sm">
                          FREE
                        </Badge>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t-2 border-emerald-400 pt-6 mb-8 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl">
                      <div className="flex justify-between items-center text-2xl sm:text-3xl font-extrabold text-gray-900">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Primary CTA - Full Width Mobile */}
                    <Button
                      asChild
                      className="w-full h-14 sm:h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-lg sm:text-xl font-bold text-white shadow-2xl hover:shadow-3xl rounded-xl border-0 transition-all duration-300 transform hover:-translate-y-1 mb-6"
                    >
                      <Link to="/checkout" className="flex items-center justify-center gap-2 sm:gap-3">
                        Proceed to Checkout
                        <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </Button>

                    {/* Trust Signals */}
                    <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-600 text-center space-y-2">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span>Orders eligible for Return & Refund</span>
                      </div>
                      <p className="text-gray-500 text-[13px]">Secure Checkout • EMI Available • Free Delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
