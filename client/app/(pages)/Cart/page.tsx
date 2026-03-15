import CartPageContent from "@/app/components/CartPageContent";
import { Suspense } from "react";


export default function CartPage() {
  return (
    // Suspense is mandatory when using useSearchParams in Next.js
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-bold text-gray-400">
        Loading Checkout...
      </div>
    }>
      <CartPageContent />
    </Suspense>
  );
}