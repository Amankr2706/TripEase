import React from "react";
import { useCurrency } from "@/context/CurrencyContext";
import {
  Hotel,
  Utensils,
  Bus,
  Plane,
  Ticket,
  ShoppingBag,
  Wallet,
  PiggyBank,
} from "lucide-react";

function CostBreakdown({ cost }) {
  const { convert, currency } = useCurrency();

  if (!cost) return null;

  let parsedCost = cost;

  if (typeof cost === "string") {
    try {
      parsedCost = JSON.parse(cost);
    } catch (err) {
      console.error("Invalid cost_breakdown JSON:", err);
      return null;
    }
  }

  const entries = Object.entries(parsedCost);
  const totalEntry = entries.find(([key]) => key.toLowerCase() === "total");
  const otherEntries = entries.filter(([key]) => key.toLowerCase() !== "total");

  const formatKey = (key) =>
    key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

  const formatValue = (value) => {
    if (typeof value === "number") {
      return `${convert(value)} ${currency}`;
    }
    if (typeof value === "string") {
      const match = value.match(/\d+(\.\d+)?/);
      if (match) {
        return `${convert(parseFloat(match[0]))} ${currency}`;
      }
      return value;
    }
    return value;
  };

  const iconMap = {
    hotel: Hotel,
    lodging: Hotel,
    food: Utensils,
    meals: Utensils,
    transport: Bus,
    bus: Bus,
    flight: Plane,
    flights: Plane,
    ticket: Ticket,
    shopping: ShoppingBag,
    misc: Wallet,
    other: PiggyBank,
  };

  const getIcon = (key) => {
    const lower = key.toLowerCase();
    for (const k in iconMap) {
      if (lower.includes(k)) return iconMap[k];
    }
    return Wallet;
  };

  return (
    <div className="space-y-3">
      {/* Breakdown rows */}
      {otherEntries.map(([key, value]) => {
        const Icon = getIcon(key);
        return (
          <div
            key={key}
            className="flex justify-between items-center border-b 
                       border-neutral-200 dark:border-neutral-700 pb-2"
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
              <span className="text-base font-medium text-neutral-700 dark:text-neutral-300">
                {formatKey(key)}
              </span>
            </div>
            <span className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {formatValue(value)}
            </span>
          </div>
        );
      })}

      {/* Total row */}
      {totalEntry && (
        <div
          className="flex justify-between items-center mt-6 px-4 py-3 rounded-lg 
                     bg-blue-500/90 dark:bg-blue-600/90 shadow-sm"
        >
          <span className="flex items-center gap-2 text-base font-semibold text-white">
            <Wallet className="w-4 h-4 text-white" />
            {formatKey(totalEntry[0])}
          </span>
          <span className="text-lg font-semibold text-white">
            {formatValue(totalEntry[1])}
          </span>
        </div>
      )}
    </div>
  );
}

export default CostBreakdown;
