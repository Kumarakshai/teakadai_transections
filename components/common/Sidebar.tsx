import React from "react";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { RiExchange2Fill } from "react-icons/ri";
import { FaList } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="h-full w-full border-r">
      <div className="flex-1 overflow-auto px-4 py-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-3 py-3 text-md font-medium transition-colors hover:bg-gray-200 hover:text-foreground"
          prefetch={false}
        >
          <RxDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className="flex items-center gap-2 rounded-md px-3 py-3 text-md font-medium transition-colors hover:bg-gray-200 hover:text-foreground"
          prefetch={false}
        >
          <RiExchange2Fill className="h-5 w-5" />
          Transactions
        </Link>
        <Link
          href="/products"
          className="flex items-center gap-2 rounded-md px-3 py-3 text-md font-medium transition-colors hover:bg-gray-200 hover:text-foreground"
          prefetch={false}
        >
          <FaList className="h-5 w-5" />
          Products
        </Link>
      </div>
    </div>
  );

  function HomeIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
};

export default Sidebar;
