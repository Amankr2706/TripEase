import React from "react";
import { Map, Share2, Edit3, Clock } from "lucide-react";

function WhyTripEase() {
  const points = [
    {
      icon: <Map className="w-6 h-6 text-blue-600" />,
      title: "Instant Itineraries",
      desc: "No long sign-ups. Get a ready-made travel plan the moment you land, so you see value right away.",
    },
    {
      icon: <Share2 className="w-6 h-6 text-blue-600" />,
      title: "Share & Collaborate",
      desc: "Auto-generate a shareable trip link and let friends duplicate or tweak your plan instantly.",
    },
    {
      icon: <Edit3 className="w-6 h-6 text-blue-600" />,
      title: "Easy to Personalize",
      desc: "Every trip can be duplicated and edited, turning each traveler into a creator and collaborator.",
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      title: "Save Hours of Planning",
      desc: "Stop juggling multiple tabs and apps—TripEase handles routes, costs, and recommendations in one place.",
    },
  ];

  return (
    <section className="w-full py-20 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 dark:text-neutral-100">
          Why You Need a Smarter Travel Planner
        </h2>
        <p className="mt-4 text-base md:text-lg text-neutral-600 dark:text-neutral-400">
          Traditional trip planning is slow, scattered, and frustrating. TripEase makes it instant, shareable, and fun.
        </p>

        {/* Benefits Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-neutral-900 shadow-md hover:shadow-lg transition text-left"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                {point.title}
              </h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Demo Itinerary Preview */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            See TripEase in Action 🚀
          </h3>
          <div className="max-w-2xl mx-auto bg-white dark:bg-neutral-900 rounded-2xl shadow-lg p-6 text-left">
            <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              ✈️ Paris – 3 Days Itinerary
            </h4>
            <ul className="mt-4 space-y-3">
              <li className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">Day 1 – Explore the City</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Eiffel Tower → Louvre Museum → Seine River Cruise
                </p>
              </li>
              <li className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold">Day 2 – Hidden Gems</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Montmartre → Sacré-Cœur → Local Cafés
                </p>
              </li>
              <li className="border-l-4 border-purple-500 pl-4">
                <p className="font-semibold">Day 3 – Day Trip</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Versailles Palace → Gardens → Return to Paris
                </p>
              </li>
            </ul>
            <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
              Generate My Trip
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyTripEase;
