import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi"
import { useCurrency } from "@/context/CurrencyContext"
import { Info, MapPin, Landmark } from "lucide-react" // ✅ replaced Ticket with Landmark

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState()
  const { convert, currency } = useCurrency()

  useEffect(() => {
    place && GetPlacePhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [place])

  const GetPlacePhoto = async () => {
    const data = { textQuery: place?.place }
    await GetPlaceDetails(data).then((resp) => {
      if (resp?.data?.places?.[0]?.photos?.[3]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        )
        setPhotoUrl(PhotoUrl)
      }
    })
  }

  // ✅ Safe ticket pricing parser
  const parsePrice = (priceStr) => {
    if (!priceStr) return null
    const match = priceStr.toString().match(/\d+(\.\d+)?/)

    return match ? parseFloat(match[0]) : null
  }

  const rawPrice = parsePrice(place?.ticket_pricing)
  const formattedTicketPrice = rawPrice
    ? `${convert(rawPrice)} ${currency}`
    : place?.ticket_pricing || "N/A"

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place?.place}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="group flex gap-4 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={photoUrl || "/placeholder.jpg"}
            alt={place?.place}
            className="w-32 h-32 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 overflow-hidden">
          {/* Title */}
          <h2 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 truncate">
            {place.place}
          </h2>

          {/* Description */}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 flex items-start gap-1">
            
            {place.details || "No description available."}
          </p>

          {/* Pricing */}
          <div className="flex items-center gap-2 text-sm font-medium mt-2">
            <Landmark className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            <span className="text-neutral-700 dark:text-neutral-300">
              {formattedTicketPrice}
            </span>
          </div>

          {/* Google Maps CTA */}
          <div className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium mt-2 group-hover:underline">
            <MapPin className="h-4 w-4" />
            View on Maps
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PlaceCardItem
