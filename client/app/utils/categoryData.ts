// utils/categories.tsx
import {
  User,
  UserCircle2,
  Baby,
  Smartphone,
  Watch,
  Footprints,
  ShoppingBag,
  LucideIcon
} from "lucide-react";

export interface CategoryType {
  name: string;
  icon: LucideIcon;
  slug: string;
}

export const categoryData: CategoryType[] = [
  {
    name: "Men",
    icon: User,
    slug: "men",
  },
  {
    name: "Women",
    icon: UserCircle2,
    slug: "women",
  },
  {
    name: "Kids",
    icon: Baby,
    slug: "kids",
  },
  {
    name: "Shoes",
    icon: Footprints,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: Watch,
    slug: "accessories",
  },
  {
    name: "Electronics",
    icon: Smartphone,
    slug: "electronics",
  },
  {
    name: "All Products",
    icon: ShoppingBag,
    slug: "all",
  },
];