import React, { useState } from "react";
import { Check, Crown } from "lucide-react";
import { Button } from "../ui/button";

function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="w-full py-20 bg-background text-foreground transition-colors">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400">
          Choose the plan that fits your travel needs.
        </p>

        {/* Toggle */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-full">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                !yearly
                  ? "bg-blue-600 text-white"
                  : "text-neutral-700 dark:text-neutral-300"
              }`}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                yearly
                  ? "bg-blue-600 text-white"
                  : "text-neutral-700 dark:text-neutral-300"
              }`}
              onClick={() => setYearly(true)}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              Free
            </h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              For casual travelers.
            </p>
            <p className="mt-6 text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              $0
              <span className="text-lg font-medium text-neutral-500"> /mo</span>
            </p>
            <ul className="mt-6 space-y-3 text-left">
              {[
                "3 trips per month",
                "Basic itineraries",
                "USD-only cost breakdown",
                "Community support",
              ].map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300"
                >
                  <Check className="w-4 h-4 text-green-500" />
                  {feat}
                </li>
              ))}
            </ul>
            <Button className="w-full mt-8">Get Started</Button>
          </div>

          {/* Pro Plan */}
          <div className="relative p-8 rounded-2xl bg-white dark:bg-neutral-900 border-2 border-blue-600 shadow-md hover:shadow-lg transition">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <h3 className="flex items-center gap-2 text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              <Crown className="w-5 h-5 text-yellow-500" /> Pro
            </h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              For frequent travelers.
            </p>
            <p className="mt-6 text-4xl font-extrabold text-blue-600 dark:text-blue-400">
              {yearly ? "$99" : "$10"}
              <span className="text-lg font-medium text-neutral-500">
                {yearly ? " /yr" : " /mo"}
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-left">
              {[
                "Unlimited trips",
                "Personalized itineraries",
                "Multi-currency support",
                "Explore More recommendations",
                "Priority support",
              ].map((feat, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300"
                >
                  <Check className="w-4 h-4 text-green-500" />
                  {feat}
                </li>
              ))}
            </ul>
            <Button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white">
              Go Pro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
