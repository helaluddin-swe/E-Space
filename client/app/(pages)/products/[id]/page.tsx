"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ShoppingCart, Heart, ShieldCheck, Truck, Loader2 } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import products from "@/app/utils/feaureData"; // Array of ProductType
import { ProductType } from "@/app/utils/productTypes";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProduct = () => {
      setLoading(true);
      
      // Ensure we compare strings to strings or numbers to numbers
      const foundProduct = products.find((p) => String(p.id) === String(id));

      if (foundProduct) {
        setProduct(foundProduct);
        if (foundProduct.sizes?.length) setSelectedSize(foundProduct.sizes[0]);
        if (foundProduct.colors?.length) setSelectedColor(foundProduct.colors[0]);
      }
      
      setTimeout(() => setLoading(false), 600);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
      Product not found.
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-xl shadow-gray-200/50 relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">
              {product.category}
            </span>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-gray-900">
              ৳{product.price.toLocaleString()}
            </p>
          </div>

          <p className="text-gray-500 leading-relaxed">
            {product.description}
          </p>

          {/* Color Selection */}
          {product.colors && (
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Color</label>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 rounded-xl border-2 font-bold transition-all ${
                      selectedColor === color
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-100 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && (
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-widest text-gray-400">Size</label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl border-2 font-bold flex items-center justify-center transition-all ${
                      selectedSize === size
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-100 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              onClick={() =>
                addToCart({
                  ...product,
                  selectedColor,
                  selectedSize,
                  quantity: 1,
                  // Adding empty images record to satisfy CartItemTypes interface if needed
                  images: {} 
                })
              }
              className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-gray-200"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="p-5 rounded-2xl border border-gray-100 hover:bg-red-50 hover:text-red-500 transition-all">
              <Heart size={20} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
              <ShieldCheck className="text-green-500" size={18} /> 100% Original
            </div>
            <div className="flex items-center gap-3 text-gray-500 text-sm font-medium">
              <Truck className="text-blue-500" size={18} /> Fast Delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;