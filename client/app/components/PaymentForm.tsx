"use client";

import React, { useState } from "react";
import axios from "axios";
import { CreditCard, Wallet, Banknote, ShieldCheck, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";

interface PaymentFormProps {
  shippingData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    district: string;
  } | null;
}

const PaymentForm = ({ shippingData }: PaymentFormProps) => {
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Destructuring from Context
  const { cartItems, total, clearCart, backendUrl } = useCart();

  const handlePayment = async () => {
    if (!shippingData?.phone) {
      alert("Please complete the shipping information step first.");
      return;
    }

    setLoading(true);
    try {
      const orderPayload = {
        user: {
          name: shippingData.name,
          email: shippingData.email,
          phone: shippingData.phone,
        },
        orderItems: cartItems.map((item) => ({
          product: item.id, // Mongoose ObjectId reference
          name: item.name,
          image: item.image,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: {
          address: shippingData.address,
          city: shippingData.city,
          postalCode: shippingData.postalCode,
          district: shippingData.district,
        },
        paymentMethod: paymentMethod, // Will be mapped to paymentResult.method in backend
        pricing: {
          subtotal: total / 0.9, 
          discount: (total / 0.9) * 0.1,
          shippingFee: 0,
          totalPrice: total,
        },
      };

      // 🚀 Axios POST request using centralized backendUrl
      const { data } = await axios.post(`${backendUrl}/api/orders`, orderPayload);

      if (data.paymentUrl) {
        // Redirect to bKash/Card Gateway
        window.location.href = data.paymentUrl;
      } else if (data.success || data._id) {
        // Success for COD
        clearCart();
        router.push("/checkout/success");
      }
    } catch (err: any) {
      console.error("Order Creation Error:", err.response?.data?.message || err.message);
      alert("Failed to process order. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const methods = [
    { id: "bkash", name: "bKash / Nagad", icon: Wallet, color: "bg-[#D12053]" },
    { id: "card", name: "Debit / Credit Card", icon: CreditCard, color: "bg-blue-600" },
    { id: "cod", name: "Cash on Delivery", icon: Banknote, color: "bg-green-600" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-xl">
          <ShieldCheck className="text-blue-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">Payment Selection</h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Safe & Encrypted</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {methods.map((m) => {
          const isSelected = paymentMethod === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setPaymentMethod(m.id)}
              className={`p-5 rounded-[2rem] border-2 transition-all flex items-center gap-4 text-left ${
                isSelected 
                  ? "border-blue-600 bg-blue-50/30 ring-4 ring-blue-50" 
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <div className={`p-3 rounded-2xl text-white shadow-lg ${m.color}`}>
                <m.icon size={22} />
              </div>
              <div className="flex-grow">
                <span className={`font-bold block ${isSelected ? "text-blue-900" : "text-gray-900"}`}>
                  {m.name}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  {m.id === 'cod' ? 'Payment at door' : 'Secure Online Transaction'}
                </span>
              </div>
              {isSelected && <CheckCircle2 className="text-blue-600 animate-in zoom-in" size={24} />}
            </button>
          );
        })}
      </div>

      <button
        onClick={handlePayment}
        disabled={loading || cartItems.length === 0}
        className="w-full bg-gray-900 hover:bg-blue-600 text-white font-black py-4 rounded-2xl mt-6 flex items-center justify-center gap-3 shadow-2xl shadow-gray-200 transition-all active:scale-95 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            {paymentMethod === "cod" ? "Confirm Order" : "Proceed to Pay"}
            <ArrowRight size={20} strokeWidth={3} />
          </>
        )}
      </button>
    </div>
  );
};

export default PaymentForm;