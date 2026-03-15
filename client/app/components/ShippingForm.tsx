"use client";

import { ArrowRight, MapPin, Phone, User, Home, Mail, Hash } from "lucide-react";
import React from "react";

interface ShippingFormProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onNext: () => void;
  onBack: () => void;
}

const ShippingForm = ({ formData, setFormData, onNext, onBack }: ShippingFormProps) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (!formData.name || !formData.phone || !formData.address || !formData.district) {
      alert("Please fill in all required fields.");
      return;
    }
    onNext();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <MapPin size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">Shipping Details</h2>
          <p className="text-sm text-gray-500 font-medium">Where should we send your order?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <User size={16} className="text-gray-400" /> Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            placeholder="e.g. Helal Uddin"
            className="p-4 border border-gray-100 bg-gray-50/50 rounded-2xl w-full focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            onChange={handleChange}
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Mail size={16} className="text-gray-400" /> Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="helal@example.com"
            className="p-4 border border-gray-100 bg-gray-50/50 rounded-2xl w-full focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            onChange={handleChange}
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Phone size={16} className="text-gray-400" /> Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            placeholder="01XXXXXXXXX"
            className="p-4 border border-gray-100 bg-gray-50/50 rounded-2xl w-full focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            onChange={handleChange}
          />
        </div>

        {/* District (Select for BD Districts) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" /> District *
          </label>
          <select
            name="district"
            required
            value={formData.district}
            className="p-4 border border-gray-100 bg-gray-50/50 rounded-2xl w-full focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all appearance-none"
            onChange={handleChange}
          >
            <option value="">Select District</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chattogram">Chattogram</option>
            <option value="Sylhet">Sylhet</option>
            {/* Add more districts as needed */}
          </select>
        </div>

        {/* Postal Code */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Hash size={16} className="text-gray-400" /> Postal Code
          </label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            placeholder="1200"
            className="p-4 border border-gray-100 bg-gray-50/50 rounded-2xl w-full focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            onChange={handleChange}
          />
        </div>

        {/* Home Address */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <Home size={16} className="text-gray-400" /> Complete Address *
          </label>
          <input
            type="text"
            name="address"
            required
            value={formData.address}
            placeholder="House #, Road #, Neighborhood"
            className="p-4 border border-gray-100 bg-gray-50/50 rounded-2xl w-full focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            onChange={handleChange}
          />
        </div>

        <div className="mt-6 md:col-span-2 flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-4 rounded-2xl border border-gray-200 text-gray-500 font-bold hover:bg-gray-50 transition-all active:scale-95"
          >
            Back to Cart
          </button>
          
          <button
            type="submit"
            className="flex-1 bg-blue-600 rounded-2xl py-4 px-8 text-white font-black flex justify-center items-center gap-3 hover:bg-blue-700 transition-all active:scale-[0.98] shadow-xl shadow-blue-200"
          >
            Continue to Payment <ArrowRight size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;