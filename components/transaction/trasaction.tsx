"use client";
import { useState, useEffect } from "react";
import { getAllTransaction } from "../../server-action/page";

export const Transactions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const getAllTransactionData = async () => {
    //     console.log("Transactions");
    const data = await getAllTransaction();
    console.log(data.data);
  };
  useEffect(() => {
    getAllTransactionData();
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col">
        {/* {filteredTransactions} */}
        <div className="grid gap-6"></div>
      </div>
    </div>
  );
};
