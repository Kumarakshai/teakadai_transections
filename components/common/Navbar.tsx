"use client";
import React, { useState } from "react";

const Navbar = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Transactions</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
