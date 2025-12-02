import React, { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD"); // default selection
  const [rates, setRates] = useState({ USD: 1 });

  // ✅ Always fetch with USD as base
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();

        if (data?.result === "success") {
          setRates(data.rates); // contains {INR: 83, EUR: 0.9, ...}
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, []);

  // ✅ Convert USD → selected currency
  const convert = (amount) => {
    if (!amount || isNaN(amount)) return "N/A";
    const num = parseFloat(amount);
    const rate = rates[currency] || 1;
    return (num * rate).toFixed(2);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

