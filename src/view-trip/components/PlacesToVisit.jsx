import React from "react"
import PlaceCardItem from "./PlaceCardItem"
import { MapPin } from "lucide-react" // ✅ icon

function PlacesToVisit({ trip }) {
  const itinerary = Array.isArray(trip.tripData?.itinerary)
    ? trip.tripData.itinerary
    : []

  if (itinerary.length === 0) {
    return (
      <div className="mt-12">
        <h2 className="flex items-center gap-2 font-bold text-2xl mb-6 text-neutral-900 dark:text-neutral-100">
          <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Nearby Attractions
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          No attractions available for this trip.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-12 space-y-10">
      {/* Section heading with icon */}
      <h2 className="flex items-center gap-2 font-bold text-2xl text-neutral-900 dark:text-neutral-100">
        <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        Nearby Attractions
      </h2>

      {itinerary.map((item, index) => (
        <div key={index} className="space-y-6">
          {/* Day heading */}
          <h3 className="font-semibold text-lg text-neutral-700 dark:text-neutral-300 border-l-4 border-blue-500 dark:border-blue-400 pl-3">
            {item.day}
          </h3>

          {/* Place cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {item.plan?.map((place, idx) => (
              <PlaceCardItem key={idx} place={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PlacesToVisit


