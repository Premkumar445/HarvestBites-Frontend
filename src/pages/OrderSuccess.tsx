// src/pages/OrderSuccess.tsx - ✅ MOBILE RESPONSIVE + SAME ADDRESS FORMAT AS OrderSummary
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { saveOrderToDatabase } from "@/services/orderService";
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  ArrowRight,
  Download,
  Home,
  ShoppingBag,
} from "lucide-react";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  flatNo: string;
  apartmentName: string;
  floorNumber: string;
  streetArea: string;
  landmark: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export default function OrderSuccess() {
  const [orderData, setOrderData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ SAME displayAddress logic as OrderSummary
  const displayAddress = orderData?.customer;

  // 🚀 SAVE TO NEON POSTGRESQL with COMPLETE address
  const saveToDatabase = useCallback(async () => {
    if (!orderData) return;
    
    try {
      setIsSaving(true);
      setSaveStatus('saving');
      
      await saveOrderToDatabase({
        orderNumber: orderData.orderNumber,
        transactionId: orderData.transactionId,
        total: orderData.total,
        items: orderData.items,
        customer: {
          name: `${orderData.customer.firstName} ${orderData.customer.lastName}`,
          phone: orderData.customer.phone.replace('+91', ''),
          email: orderData.customer.email,
          flatNo: orderData.customer.flatNo,
          apartmentName: orderData.customer.apartmentName,
          floorNumber: orderData.customer.floorNumber,
          streetArea: orderData.customer.streetArea,
          landmark: orderData.customer.landmark,
          address: orderData.customer.address,
          city: orderData.customer.city,
          state: orderData.customer.state,
          pincode: orderData.customer.pincode,
        },
        paymentMethod: orderData.paymentMethod,
      });
      
      setSaveStatus('success');
    } catch (error) {
      console.error('❌ Save failed:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  }, [orderData]);

  useEffect(() => {
    const stateOrder = (location.state as any)?.order;
    const localOrder = localStorage.getItem("recent_order");
    
    if (stateOrder) {
      setOrderData(stateOrder);
      localStorage.setItem("recent_order", JSON.stringify(stateOrder));
    } else if (localOrder) {
      try {
        setOrderData(JSON.parse(localOrder));
      } catch {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  useEffect(() => {
    if (orderData && saveStatus === 'idle') {
      saveToDatabase();
    }
  }, [orderData, saveStatus, saveToDatabase]);

  if (!orderData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center py-12 px-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <style>{`
        .old-paper-bg {
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #fdf4e5 0%, #f8e9d2 25%, #f0e6d0 50%, #e8d9c2 75%, #ddd2b8 100%);
        }
        @media (max-width: 640px) {
          .mobile-stack { flex-direction: column !important; gap: 1rem !important; }
        }
      `}</style>

      <div className="old-paper-bg min-h-screen py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          
          {/* ✅ MOBILE OPTIMIZED Success Header */}
          <div className="text-center mb-6 sm:mb-8 px-2">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-green-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
              Order Placed Successfully!
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-0">Order #{orderData.orderNumber}</p>
          </div>

          {/* Order Details Card - Mobile Responsive */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6 md:p-8 mb-6">
            
            {/* ✅ MOBILE STACKED Order Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 pb-4 sm:pb-6 border-b border-gray-200">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-gray-600">Order Number</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">#{orderData.orderNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-gray-600">Transaction ID</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900">{orderData.transactionId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-gray-600">Order Date</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900">
                  {new Date(orderData.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-gray-600">Payment Method</p>
                <p className="text-base sm:text-lg font-semibold text-gray-900 capitalize">
                  {orderData.paymentMethod === 'razorpay' ? 'Online Payment (Easebuzz)' : 'Cash on Delivery'}
                </p>
              </div>
            </div>

            {/* ✅ SAME DELIVERY ADDRESS SECTION AS ORDER SUMMARY - MOBILE RESPONSIVE */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-4 sm:p-6 md:p-8 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 mb-2 sm:mb-0">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  Deliver to
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-orange-600 hover:bg-orange-50/50 h-9 px-3 sm:px-4 mt-2 sm:mt-0 w-full sm:w-auto"
                >
                  Edit
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Home className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* 👤 COMPLETE NAME - SAME AS ORDER SUMMARY */}
                    <p className="font-semibold text-base sm:text-lg text-gray-900">
                      {displayAddress?.firstName || ''} {displayAddress?.lastName || ''}
                    </p>
                    
                    {/* 🏠 COMPLETE FORMATTED ADDRESS - IDENTICAL FORMAT */}
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base mt-1">
                      {`${displayAddress?.flatNo || ''}, ${displayAddress?.apartmentName || ''}${displayAddress?.floorNumber ? `, ${displayAddress.floorNumber}` : ''}`}
                      <br />
                      {displayAddress?.streetArea || ''}, {displayAddress?.address || ''}
                      <br />
                      {displayAddress?.landmark ? `Near ${displayAddress.landmark}` : ''}
                    </p>
                    
                    {/* 📍 CITY, STATE, PINCODE - EXACT SAME */}
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                      {displayAddress?.city || ''}, {displayAddress?.state || ''} - {displayAddress?.pincode || ''}
                    </p>
                    
                    {/* 📞 PHONE + 📧 EMAIL - MOBILE RESPONSIVE */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3 pt-2 border-t border-blue-100">
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 w-full sm:w-auto">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{displayAddress?.phone || ''}</span>
                      </div>
                      <div className="w-1 h-1 sm:w-auto sm:h-auto bg-gray-300 rounded-full sm:hidden mx-auto"></div>
                      <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 w-full sm:w-auto">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="truncate">{displayAddress?.email || ''}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Timeline - Mobile Optimized */}
            <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base sm:text-gray-900 mb-2">Estimated Delivery</p>
                  <p className="text-sm text-gray-600 mb-3">Your order will be delivered in 2-4 business days</p>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700 truncate">
                      Expected by {new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ✅ MOBILE RESPONSIVE Order Items */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-4 sm:p-6 md:p-8 mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              Order Items ({orderData.items})
            </h3>
            <div className="space-y-3 sm:space-y-4 max-h-[50vh] overflow-y-auto">
              {orderData.details.map((item: any) => (
                <div key={item.id} className="flex gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50/50 rounded-xl transition-colors border border-gray-100">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border">
                    <img
                      src={item.image || `https://via.placeholder.com/80x80/6b7280/f8fafc?text=${item.name.charAt(0)}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 py-1 space-y-1 sm:space-y-2">
                    <h4 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Qty: <span className="font-medium">{item.quantity}</span> × ₹{item.price.toLocaleString()}
                    </p>
                    <p className="text-base sm:text-lg font-bold text-orange-600">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-200 mt-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
                <span className="text-base sm:text-lg font-semibold text-gray-900">Total Amount Paid</span>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  ₹{orderData.total.toLocaleString()}
                </span>
              </div>
              {orderData.paymentMethod === 'razorpay' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Payment received successfully
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ✅ MOBILE RESPONSIVE Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6">
            <Button
              onClick={() => navigate(`/track-order/${orderData.orderNumber}`)}
              className="h-12 sm:h-14 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg w-full"
              disabled={isSaving}
            >
              <Package className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              Track Order
            </Button>
            
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="h-12 sm:h-14 border-2 border-gray-300 hover:bg-gray-50 font-semibold rounded-xl w-full"
              disabled={isSaving}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
              Continue Shopping
            </Button>
          </div>

          {/* Save Status - Mobile Optimized */}
          {saveStatus === 'saving' && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center mb-6">
              <div className="inline-flex items-center justify-center gap-2 text-blue-700">
                <div className="w-5 h-5 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="text-sm">Order being saved to database...</span>
              </div>
            </div>
          )}
          {saveStatus === 'success' && (
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 text-center mb-6">
              <CheckCircle className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-emerald-700 font-semibold text-sm sm:text-base">Order saved successfully!</p>
            </div>
          )}

          {/* Help Section - Mobile Responsive */}
          <div className="bg-orange-50/50 border border-orange-200/50 rounded-2xl p-4 sm:p-6 text-center">
            <h4 className="font-bold text-lg sm:text-xl text-gray-900 mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-4 px-2">
              If you have any questions about your order, feel free to contact our support team
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-4 text-sm">
              <a href="mailto:support@harvestbites.com" className="text-orange-600 hover:text-orange-700 font-medium flex items-center justify-center gap-1 hover:underline w-full sm:w-auto py-2 sm:py-0">
                <Mail className="w-4 h-4" />
                support@harvestbites.com
              </a>
              <div className="w-full h-px bg-gray-300 sm:hidden"></div>
              <a href="tel:+919876543210" className="text-orange-600 hover:text-orange-700 font-medium flex items-center justify-center gap-1 hover:underline w-full sm:w-auto py-2 sm:py-0">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
