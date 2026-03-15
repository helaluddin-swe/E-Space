"use client";
import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categoryData } from "../utils/categoryData";

const Category = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const selectedCategory = searchParams.get("category") || "all";

  const handleChange = (slug: string) => {
    const params = new URLSearchParams(searchParams);
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    setCategories(categoryData);
  }, []);

  return (
    <div className="flex overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-4 lg:grid-cols-6 gap-3 scrollbar-hide">
      {/* "All" Category Option */}
      <div
        className={`flex-shrink-0 px-4 py-2 rounded-full cursor-pointer border transition-all duration-200 text-sm font-medium flex items-center gap-2 ${
          selectedCategory === "all"
            ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
            : "bg-white border-gray-200 text-gray-600 hover:border-blue-400"
        }`}
        onClick={() => handleChange("all")}
      >
        All Products
      </div>

      {categories.map((category) => (
        <div
          key={category.slug}
          className={`flex-shrink-0 px-4 py-2 rounded-full cursor-pointer border transition-all duration-200 text-sm font-medium flex items-center gap-2 ${
            selectedCategory === category.slug
              ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200"
              : "bg-white border-gray-200 text-gray-600 hover:border-blue-400"
          }`}
          onClick={() => handleChange(category.slug)}
        >
          <category.icon size={18} className={selectedCategory === category.slug ? "text-white" : "text-blue-500"} />
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Category;