import React from "react"
import HotelCardItem from "./HotelCardItem"

function Hotels({ trip }) {
  if (!trip?.tripData?.hotel_options) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {trip.tripData.hotel_options.map((hotel, index) => (
        <div
          key={index}
          className="transition-transform duration-300 hover:-translate-y-1"
        >
          <HotelCardItem hotel={hotel} />
        </div>
      ))}
    </div>
  )
}

export default Hotels
