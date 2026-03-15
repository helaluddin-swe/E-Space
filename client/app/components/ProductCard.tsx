"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Check } from "lucide-react";
import Image from "next/image";
import { ProductType } from "../utils/productTypes";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }: { product: ProductType }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Default selected options
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  // Handle size/color changes
  const handleProductTypes = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({ ...prev, [type]: value }));
  };

  // Add to Cart Logic
  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor: productTypes.color,
      selectedSize: productTypes.size,
      quantity: 1,
      // Since your new data uses a single string for 'image', we use it directly
      image: product.image,
    });

    // UI Feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Currency formatter
  const formattedPrice = new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="group flex flex-col h-full border border-gray-100 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 bg-white p-4">
      {/* Product Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50">
        <Link
          href={`/products/${product.id}`}
          className="block w-full h-full relative"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={product.id <= 4}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </Link>

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-700 uppercase tracking-tighter shadow-sm pointer-events-none">
          {product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-5 grow">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed font-medium">
          {product.shortDescription}
        </p>
      </div>

      {/* Selectors Container */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-widest font-black text-gray-300">
            Size
          </label>
          <select
            value={productTypes.size}
            onChange={(e) =>
              handleProductTypes({ type: "size", value: e.target.value })
            }
            className="text-xs font-bold px-2 py-2 border border-gray-100 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
          >
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase tracking-widest font-black text-gray-300">
            Color
          </label>
          <div className="flex flex-wrap gap-1.5 py-1">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  handleProductTypes({ type: "color", value: color })
                }
                title={color}
                className={`w-6 h-6 rounded-full border-2 p-0.5 transition-all active:scale-90 ${
                  productTypes.color === color
                    ? "border-blue-600 shadow-lg shadow-blue-200"
                    : "border-transparent"
                }`}
              >
                <div
                  className="w-full h-full rounded-full border border-black/5"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Price & Action */}
      <div className="flex mt-6 justify-between items-center pt-5 border-t border-gray-50">
        <div>
          <span className="text-[10px] text-gray-300 block font-black uppercase tracking-widest">
            BDT
          </span>
          <p className="text-xl font-black text-blue-600 tracking-tight">
            {formattedPrice.replace("BDT", "")}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdded}
          className={`${
            isAdded
              ? "bg-green-500 text-white"
              : "bg-gray-900 text-white hover:bg-blue-600 shadow-xl shadow-gray-200"
          } flex items-center justify-center gap-2 h-12 px-5 rounded-2xl font-black transition-all active:scale-95 disabled:opacity-100`}
        >
          {isAdded ? (
            <Check size={20} className="animate-in zoom-in duration-300" />
          ) : (
            <>
              <ShoppingCart size={18} strokeWidth={3} />
              <span className="text-sm">ADD</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;