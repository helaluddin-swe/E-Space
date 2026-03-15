"use client";

import { Trash, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { CartItemTypes } from "../utils/productTypes";
import { useCart } from "../context/CartContext";


const ProductCart = ({ item }: { item: CartItemTypes }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const displayImage = item.image[item.selectedColor] || item.image;

  return (
    <div className="flex flex-col sm:flex-row gap-4 bg-white border border-gray-100 p-5 rounded-[2rem] items-center mb-4 transition-all hover:shadow-xl hover:shadow-gray-100/50">
      
      {/* Product Image */}
      <div className="relative h-28 w-28 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-50">
        <Image
          src={displayImage}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-lg font-black text-gray-900 leading-tight">
          {item.name}
        </h3>
        
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
          <span className="text-[10px] font-bold px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg uppercase tracking-wider">
            Size: {item.selectedSize}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg uppercase tracking-wider">
            Color: {item.selectedColor}
          </span>
        </div>
        
        <div className="mt-4 flex items-center justify-center sm:justify-start gap-6">
            <p className="text-gray-900 font-black text-xl">
              <span className="text-xs text-gray-400 font-medium mr-1 uppercase">BDT</span>
              {item.price.toLocaleString()}
            </p>
        </div>
      </div>

      {/* Quantity Controls & Actions */}
      <div className="flex flex-row sm:flex-col items-center gap-6 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-gray-50 pt-4 sm:pt-0 sm:pl-6">
        
        {/* Quantity Toggle */}
        <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
          <button 
            onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, -1)}
            className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-400 hover:text-red-500 disabled:opacity-30"
            disabled={item.quantity <= 1}
          >
            <Minus size={16} strokeWidth={3} />
          </button>
          
          <span className="w-10 text-center font-black text-gray-800 text-sm">
            {item.quantity}
          </span>

          <button 
            onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, 1)}
            className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-400 hover:text-blue-600"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>

        <div className="flex items-center gap-4 ml-auto sm:ml-0">
          <div className="hidden sm:block text-right">
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Subtotal</p>
             <p className="text-sm font-black text-blue-600">
                {(item.price * item.quantity).toLocaleString()}
             </p>
          </div>

          <button 
            onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
            className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all active:scale-90"
            title="Remove item"
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;