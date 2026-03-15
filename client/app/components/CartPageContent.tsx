"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ShoppingBag, ChevronLeft } from "lucide-react";

import PaymentForm from "@/app/components/PaymentForm";
import ProductCart from "@/app/components/ProductCart";
import ShippingForm from "@/app/components/ShippingForm";
import { useCart } from "@/app/context/CartContext";

const CartPageContent = () => {
  const { cartItems, cartCount } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // 1. Shared Shipping State
  const [shippingData, setShippingData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    postalCode: "",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activeStep = parseInt(searchParams.get("steps") || "1");

  const steps = [
    { id: 1, title: "Shopping Cart" },
    { id: 2, title: "Shipping Address" },
    { id: 3, title: "Payment" },
  ];

  const navigateToStep = (stepId: number) => {
    // Basic validation before moving to payment
    if (stepId === 3 && (!shippingData.name || !shippingData.phone || !shippingData.district)) {
      alert("Please complete shipping details first.");
      return;
    }
    router.push(`/Cart?steps=${stepId}`);
  };

  // 2. Memoized Calculations with Dynamic Shipping
  const { subtotal, discount, shippingFee, total } = useMemo(() => {
    const sub = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const disc = sub * 0.1; // 10% discount
    // Dynamic Shipping: 60 for Dhaka, 120 elsewhere, 0 if free/not selected
    const fee = shippingData.district === "Dhaka" ? 60 : shippingData.district ? 120 : 0;
    
    return { 
      subtotal: sub, 
      discount: disc, 
      shippingFee: fee, 
      total: sub - disc + fee 
    };
  }, [cartItems, shippingData.district]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(amount);

  if (!isMounted) return <div className="min-h-screen bg-white" />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-gray-900">Checkout</h1>
        {activeStep > 1 && (
          <button 
            onClick={() => navigateToStep(activeStep - 1)}
            className="flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={18} /> Back
          </button>
        )}
      </div>

      {/* Stepper Header */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              onClick={() => navigateToStep(step.id)}
              className={`flex items-center gap-3 cursor-pointer transition-all ${
                activeStep === step.id ? "text-blue-600 scale-105" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${
                activeStep === step.id ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300"
              }`}>
                {step.id}
              </span>
              <p className="font-bold whitespace-nowrap">{step.title}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`hidden md:block w-16 h-[2px] ${activeStep > step.id ? "bg-blue-600" : "bg-gray-200"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-100/50 p-6 md:p-8">
          {activeStep === 1 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold border-b pb-4">Your Items ({cartCount})</h2>
              {cartItems.length > 0 ? (
                <div className="divide-y divide-gray-50">
                  {cartItems.map((item) => (
                    <ProductCart item={item} key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <ShoppingBag size={64} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-500 font-medium">Your cart is feeling light.</p>
                  <button onClick={() => router.push("/")} className="mt-4 bg-blue-50 text-blue-600 px-6 py-2 rounded-xl font-bold">Browse Products</button>
                </div>
              )}
            </div>
          ) : activeStep === 2 ? (
            <ShippingForm 
              formData={shippingData} 
              setFormData={setShippingData} 
              onNext={() => navigateToStep(3)} 
              onBack={() => navigateToStep(1)} 
            />
          ) : (
            <PaymentForm shippingData={shippingData} />
          )}
        </div>

        {/* Order Summary Column */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-gray-900 text-white rounded-3xl p-8 sticky top-24 shadow-2xl shadow-blue-900/20">
            <h2 className="text-xl font-bold mb-6 border-b border-gray-800 pb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-green-400">
                <span>Promo Discount (10%)</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
              <div className="flex justify-between text-gray-400 border-b border-gray-800 pb-4">
                <span>Shipping Fee</span>
                <span className={shippingFee === 0 ? "text-blue-400 font-bold uppercase text-xs" : "text-white"}>
                  {shippingFee === 0 ? "Calculated in Next Step" : formatCurrency(shippingFee)}
                </span>
              </div>
              
              <div className="flex justify-between text-2xl font-black pt-2">
                <span>Total</span>
                <span className="text-blue-500">{formatCurrency(total)}</span>
              </div>
            </div>

            {cartItems.length > 0 && activeStep < 3 && (
              <button
                onClick={() => navigateToStep(activeStep + 1)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-2xl mt-8 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-600/30"
              >
                {activeStep === 1 ? "Shipping Details" : "Proceed to Payment"} <ArrowRight size={20} />
              </button>
            )}

            {activeStep === 3 && (
              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold">
                  Payment for: {shippingData.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageContent;