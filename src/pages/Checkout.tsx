// src/pages/Checkout.tsx - MOBILE-FIRST User-Friendly Version
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle,
  Phone,
  Mail,
} from "lucide-react";
import axios from "axios";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  // Stepper
  const [activeStep, setActiveStep] = useState(1);
  const steps = ["Contact", "Address", "Payment"];

  // Mobile-First Form State
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    flatNo: "",
    apartmentName: "",
    floorNumber: "",
    streetArea: "",
    landmark: "",
    address: "",
    city: "",
    state: "Tamil Nadu",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{
    lat: number | null;
    lng: number | null;
  }>({ lat: null, lng: null });

  // Buy Now state
  const buyNowState = location.state as
    | {
        mode?: string;
        item?: { 
          id: number; 
          name: string; 
          price: number; 
          quantity: number;
          image?: string;
        };
      }
    | undefined;

  const isBuyNow = buyNowState?.mode === "buynow";
  const buyNowItem = buyNowState?.item;
  const visibleItems = isBuyNow && buyNowItem ? [buyNowItem] : items;

  const subtotal = visibleItems.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0
  );
  const total = Math.max(0, subtotal - couponDiscount);

  // Mobile-Optimized Validation
  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return (
          form.firstName.trim().length > 1 &&
          form.lastName.trim().length > 0 &&
          form.email.includes("@") &&
          form.phone.trim().length >= 10
        );
      case 2:
        return (
          form.flatNo.trim().length > 0 &&
          form.apartmentName.trim().length > 0 &&
          form.streetArea.trim().length > 3 &&
          form.address.trim().length > 5 &&
          form.city.trim().length > 1 &&
          form.pincode.trim().length === 6
        );
      default:
        return true;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Mobile-optimized Pincode validation
  const validatePincode = useCallback(
    async (pin: string) => {
      if (pin.length === 6) {
        try {
          const res = await axios.get(
            `https://api.postalpincode.in/pincode/${pin}`
          );
          if (res.data[0]?.Status === "Success") {
            const data = res.data[0].PostOffice[0];
            setForm((prev) => ({
              ...prev,
              city: data.District || data.Block,
              state: data.State,
            }));
            toast({
              title: "✅ Address Auto-filled",
              description: `${data.Block}, ${data.State}`,
            });
          }
        } catch {
          toast({
            title: "❌ Invalid PIN",
            description: "Please check your pincode.",
            variant: "destructive",
          });
        }
      }
    },
    [toast]
  );

  // Location auto-fill
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {},
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location not supported",
        description: "Enable location manually.",
        variant: "destructive",
      });
      return;
    }
    setIsProcessing(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setForm((prev) => ({
          ...prev,
          flatNo: "GPS",
          apartmentName: "Current Location", 
          streetArea: `Hosur Area (${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)})`,
          address: "Detected location",
          landmark: "GPS Location",
        }));
        toast({
          title: "📍 Location Found",
          description: "Address auto-filled!",
        });
        setIsProcessing(false);
      },
      () => {
        toast({
          title: "Location Denied",
          description: "Enter address manually.",
          variant: "destructive",
        });
        setIsProcessing(false);
      },
      { timeout: 10000 }
    );
  };

  const goToOrderSummary = () => {
    if (!isStepValid(activeStep)) {
      toast({
        title: "Missing Fields",
        description: "Fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const orderSummaryData = {
      form,
      paymentMethod,
      subtotal,
      total,
      visibleItems,
      couponDiscount,
      locationCoords,
    };

    navigate("/order-summary", { 
      state: { 
        orderSummary: orderSummaryData,
        fromCheckout: true 
      } 
    });
  };

  const nextStep = () => {
    if (!isStepValid(activeStep)) {
      toast({
        title: "Complete Fields",
        description: `Fill ${steps[activeStep - 1]} details.`,
        variant: "destructive",
      });
      return;
    }
    
    if (activeStep === 1) {
      setActiveStep(2);
    } else if (activeStep === 2) {
      setActiveStep(3);
    } else {
      goToOrderSummary();
    }
  };

  const prevStep = () => setActiveStep((s) => Math.max(1, s - 1));

  return (
    <Layout>
      <div className="py-6 sm:py-8 md:py-12 bg-gradient-to-b from-white to-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          
          {/* Mobile-First Stepper */}
          <div className="mb-6 sm:mb-8">
            <div className="flex justify-center">
              <div className="flex items-center w-full max-w-md mx-auto">
                {steps.map((step, index) => (
                  <div key={step} className="flex-1 flex flex-col items-center">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold mb-2 transition-all shadow-md ${
                        activeStep > index + 1
                          ? "bg-emerald-500 text-white"
                          : activeStep === index + 1
                          ? "bg-amber-400 text-white ring-2 ring-amber-300"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-medium px-1 text-center">
                      {step}
                    </span>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-full h-1 mt-2 sm:mt-3 ${
                          activeStep > index + 1
                            ? "bg-emerald-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
            
            {/* FORMS - Full width mobile */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Back Button */}
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-emerald-600 font-medium p-2 -m-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Cart
              </Link>

              {/* STEP 1 - Contact */}
              {activeStep === 1 && (
                <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                        Contact Info
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600">
                        Updates via Email & WhatsApp
                      </p>
                    </div>
                  </div>

                  {/* Mobile Stacked Contact Form */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">First Name *</Label>
                        <Input 
                          name="firstName" 
                          value={form.firstName} 
                          onChange={handleInputChange} 
                          required 
                          className="h-12 text-base" 
                          placeholder="Ravi"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Last Name *</Label>
                        <Input 
                          name="lastName" 
                          value={form.lastName} 
                          onChange={handleInputChange} 
                          required 
                          className="h-12 text-base" 
                          placeholder="Kumar"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Email *</Label>
                      <Input 
                        name="email" 
                        type="email" 
                        value={form.email} 
                        onChange={handleInputChange} 
                        required 
                        className="h-12 text-base" 
                        placeholder="ravi@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Phone (WhatsApp) *</Label>
                      <Input 
                        name="phone" 
                        type="tel" 
                        inputMode="numeric" 
                        maxLength={14}
                        value={form.phone} 
                        onChange={handleInputChange} 
                        required 
                        className="h-12 text-base" 
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 - Address - MOBILE OPTIMIZED */}
              {activeStep === 2 && (
                <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-7 w-7 sm:h-8 sm:w-8 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                        Delivery Address
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600">
                        Enter exact address for fast delivery
                      </p>
                    </div>
                  </div>

                  {/* GPS Button - Always Top */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-6 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                    <Button 
                      type="button" 
                      onClick={handleUseCurrentLocation} 
                      disabled={isProcessing}
                      className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 text-sm sm:text-base font-semibold text-white shadow-lg"
                    >
                      📍 {isProcessing ? "Detecting..." : "Use My Location"}
                    </Button>
                    <p className="text-xs sm:text-sm text-emerald-800 text-center sm:text-left flex-1 flex items-center">
                      Auto-fills address from GPS
                    </p>
                  </div>

                  {/* Simplified Mobile Address Form */}
                  <div className="space-y-4">
                    {/* Flat Details - Compact */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Flat No. *</Label>
                        <Input 
                          name="flatNo" 
                          value={form.flatNo} 
                          onChange={handleInputChange} 
                          required 
                          className="h-12 text-base" 
                          placeholder="402"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Building *</Label>
                        <Input 
                          name="apartmentName" 
                          value={form.apartmentName} 
                          onChange={handleInputChange} 
                          required 
                          className="h-12 text-base" 
                          placeholder="Sunrise Apt"
                        />
                      </div>
                    </div>

                    {/* Street & Full Address */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Street/Area *</Label>
                      <Input 
                        name="streetArea" 
                        value={form.streetArea} 
                        onChange={handleInputChange} 
                        required 
                        className="h-12 text-base" 
                        placeholder="Thottampalayam"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Full Address *</Label>
                      <Input 
                        name="address" 
                        value={form.address} 
                        onChange={handleInputChange} 
                        required 
                        className="h-12 text-base" 
                        placeholder="Door no. 45, Main road"
                      />
                    </div>

                    {/* Landmark & PIN */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Landmark *</Label>
                        <Input 
                          name="landmark" 
                          value={form.landmark} 
                          onChange={handleInputChange} 
                          required 
                          className="h-12 text-base" 
                          placeholder="Near Shree Krishna"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">PIN Code *</Label>
                        <Input 
                          name="pincode" 
                          inputMode="numeric" 
                          maxLength={6}
                          value={form.pincode} 
                          onChange={(e) => { 
                            handleInputChange(e); 
                            validatePincode(e.target.value); 
                          }} 
                          required 
                          className="h-12 text-base" 
                          placeholder="632004"
                        />
                      </div>
                    </div>

                    {/* City & State */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">City *</Label>
                        <Input 
                          name="city" 
                          value={form.city} 
                          onChange={handleInputChange} 
                          required 
                          className="h-12 text-base" 
                          placeholder="Hosur"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">State</Label>
                        <Input 
                          name="state" 
                          value={form.state} 
                          onChange={handleInputChange} 
                          className="h-12 text-base" 
                          placeholder="Tamil Nadu"
                        />
                      </div>
                    </div>

                    {/* GPS Preview */}
                    {locationCoords.lat && (
                      <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-800">GPS Active</span>
                        </div>
                        <div className="bg-white p-2 rounded-lg text-xs font-mono text-emerald-700">
                          📍 {locationCoords.lat.toFixed(5)}, {locationCoords.lng?.toFixed(5)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3 - Payment */}
              {activeStep === 3 && (
                <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <CreditCard className="h-7 w-7 sm:h-8 sm:w-8 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                        Payment
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600">
                        ₹{total.toLocaleString()} • Secure payment
                      </p>
                    </div>
                  </div>

                  {/* Single Payment Button - Full Width Mobile */}
                  <div className="space-y-4 mb-8">
                    <Button
                      type="button"
                      onClick={() => setPaymentMethod("razorpay")}
                      className="w-full h-14 justify-start gap-4 p-4 border-2 text-emerald-800  border-emerald-200 hover:bg-emerald-100 text-left text-base font-semibold shadow-md"
                    >
                      <CreditCard className="h-6 w-6 flex-shrink-0" />
                      <span className="flex-1">Cards/UPI/Netbanking</span>
                    
                    </Button>
                  </div>

                  {/* Trust badges */}
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div className="p-3 bg-emerald-50 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mx-auto mb-2" />
                      <span className="font-medium text-emerald-800">Secure</span>
                    </div>
                    <div className="p-3 bg-green-50 rounded-xl">
                      <Truck className="h-5 w-5 text-green-600 mx-auto mb-2" />
                      <span className="font-medium text-green-800">Free Delivery</span>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <Phone className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                      <span className="font-medium text-blue-800">24×7 Support</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary - Always Visible */}
            <div className="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white/95 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex-1">
                    Order Summary
                  </h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-semibold">
                    {visibleItems.length} item{visibleItems.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Items List - Scrollable Mobile */}
                <div className="space-y-3 mb-6 max-h-48 sm:max-h-64 overflow-y-auto pr-2">
                  {visibleItems.map((item: any) => {
                    const imageUrl = item.image || 
                      `https://via.placeholder.com/60x60/f3f4f6/10b981?text=${item.name[0] || 'B'}`;
                    return (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm sm:text-base line-clamp-1 pr-2">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-sm sm:text-base text-emerald-600">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-6 text-sm sm:text-base">
                  <div className="flex justify-between font-semibold">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Delivery</span>
                    <span>FREE</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600 font-semibold">
                      <span>Coupon</span>
                      <span>-₹{couponDiscount.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* TOTAL */}
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl mb-6 border-2 border-emerald-200">
                  <div className="flex justify-between items-center text-2xl sm:text-3xl font-extrabold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-700 mt-1">2-4 days delivery</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={isProcessing || visibleItems.length === 0}
                    className="w-full h-14 text-lg font-bold shadow-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-2xl transform hover:-translate-y-0.5 transition-all"
                  >
                    {isProcessing
                      ? "⏳ Processing..."
                      : activeStep === 1
                      ? "➡️ Continue to Address"
                      : activeStep === 2
                      ? "💳 Continue to Payment" 
                      : "✅ Place Order"
                    }
                  </Button>
                  
                  {activeStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep} 
                      className="w-full h-12 border-emerald-300 text-emerald-700 hover:bg-emerald-50 font-semibold"
                    >
                      ← Previous Step
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
