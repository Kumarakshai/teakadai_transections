"use client";
import React, { useState } from "react";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { RiExchange2Fill } from "react-icons/ri";
import { FaList } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`relative h-full ${
        isOpen ? "w-[20vw]" : "w-[5vw]"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="h-full border-r">
        <div className="flex-1 overflow-auto p-4">
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-md px-3 py-3 text-md font-medium transition-colors hover:bg-gray-200 hover:text-foreground ${
              !isOpen && "justify-center"
            }`}
            prefetch={false}
          >
            <RxDashboard className="h-5 w-5" />
            {isOpen && "Dashboard"}
          </Link>
          <Link
            href="/transactions"
            className={`flex items-center gap-2 rounded-md px-3 py-3 text-md font-medium transition-colors hover:bg-gray-200 hover:text-foreground ${
              !isOpen && "justify-center"
            }`}
            prefetch={false}
          >
            <RiExchange2Fill className="h-5 w-5" />
            {isOpen && "Transactions"}
          </Link>
          <Link
            href="/products"
            className={`flex items-center gap-2 rounded-md px-3 py-3 text-md font-medium transition-colors hover:bg-gray-200 hover:text-foreground ${
              !isOpen && "justify-center"
            }`}
            prefetch={false}
          >
            <FaList className="h-5 w-5" />
            {isOpen && "Products"}
          </Link>
        </div>
      </div>
      {/* <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
      >
        {isOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button> */}
    </div>
  );
};

export default Sidebar;
