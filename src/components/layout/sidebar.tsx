"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-50 min-h-screen p-4">
      <nav className="space-y-2">
        <Link
          href="/products"
          className={`block px-4 py-2 rounded-lg ${
            pathname === "/products" ? "bg-blue-50 text-blue-600" : ""
          }`}
        >
          Products
        </Link>
        <Link
          href="/shops"
          className={`block px-4 py-2 rounded-lg ${
            pathname === "/shops" ? "bg-blue-50 text-blue-600" : ""
          }`}
        >
          Shops
        </Link>
      </nav>
    </aside>
  );
}
