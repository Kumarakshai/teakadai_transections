"use client";
import { useState, useEffect } from "react";

export default function Component() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: "Rent Payment",
      date: "2023-04-01",
      amount: 1200.0,
    },
    {
      id: 2,
      description: "Grocery Shopping",
      date: "2023-04-05",
      amount: 125.43,
    },
    {
      id: 3,
      description: "Utility Bill",
      date: "2023-04-10",
      amount: 89.99,
    },
    {
      id: 4,
      description: "Online Purchase",
      date: "2023-04-15",
      amount: 49.99,
    },
    {
      id: 5,
      description: "Dining Out",
      date: "2023-04-20",
      amount: 75.0,
    },
    {
      id: 6,
      description: "Gym Membership",
      date: "2023-04-25",
      amount: 59.99,
    },
    {
      id: 7,
      description: "Car Repair",
      date: "2023-04-30",
      amount: 350.0,
    },
    {
      id: 8,
      description: "Clothing Purchase",
      date: "2023-05-01",
      amount: 79.99,
    },
    {
      id: 9,
      description: "Subscription Renewal",
      date: "2023-05-05",
      amount: 14.99,
    },
    {
      id: 10,
      description: "Travel Expenses",
      date: "2023-05-10",
      amount: 1500.0,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("YOUR_API_URL");
        const data = await response.json();
        setTransactions(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);
  const filteredTransactions = transactions.filter((transaction) =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-4 md:p-6">
          <div className="grid gap-6">
            {isLoading
              ? Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[48px_1fr_100px] items-center gap-4 rounded-md bg-muted p-4 animate-pulse"
                  >
                    <div className="h-12 w-12 rounded-md bg-background" />
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 rounded-md bg-background" />
                      <div className="h-4 w-2/3 rounded-md bg-background" />
                    </div>
                    <div className="h-4 w-20 rounded-md bg-background" />
                  </div>
                ))
              : filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="grid grid-cols-[48px_1fr_100px] items-center gap-4 rounded-md bg-gray-400 p-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                      <WalletIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{transaction.description}</h3>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date}
                      </p>
                    </div>
                    <div className="text-right font-medium">
                      {transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
          </div>
        </main>
      </div>
    </div>
  );
}

function WalletIcon(props: any) {
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
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}
