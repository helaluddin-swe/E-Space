"use client"
import Image from "next/image";
import FeatureImg from "./images/ecommerce.png";
import productsData from "./utils/feaureData";
import ProductCard from "./components/ProductCard";
import { useState, useEffect } from "react";
import { ProductType } from "./utils/productTypes";

import { useSearchParams } from "next/navigation";
import Category from "./components/Category";

function HomePage() {
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const filterData = () => {
      if (!selectedCategory || selectedCategory === "all") {
        setFilteredProducts(productsData);
      } else {
        const filtered = productsData.filter(
          (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredProducts(filtered);
      }
    };
    filterData();
  }, [selectedCategory]); // Re-run whenever the category in the URL changes

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Feature Hero Section */}
      <div className="mb-10 relative w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
        <Image 
            src={FeatureImg} 
            alt="Feature branding" 
            fill 
            className="object-cover transition-transform duration-700 hover:scale-105" 
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center px-8 md:px-16">
            <h1 className="text-white text-4xl md:text-6xl font-black max-w-md">
                Upgrade Your Lifestyle.
            </h1>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Browse Categories</h2>
        <Category />
      </div>

      {/* Product Grid Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-gray-900">
            {selectedCategory ? `${selectedCategory.toUpperCase()}` : "All Products"}
        </h2>
        <p className="text-gray-500 text-sm font-medium">{filteredProducts.length} items found</p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed">
            <p className="text-gray-400 font-medium">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;