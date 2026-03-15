import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ShoppingIcon = () => {
  return (
    <div>
      <Link
        href={"/Cart"}
        className="flex flex-col items-center justify-center relative"
      >
        <ShoppingCartIcon className="" />
        <span className="absolute -top-3 -right-3 rounded-full h-6 w-6 bg-amber-200 items-center text-center font-semibold ">
          0
        </span>
      </Link>
    </div>
  );
};

export default ShoppingIcon;
