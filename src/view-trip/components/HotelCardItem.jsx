import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useCurrency } from "@/context/CurrencyContext"
import { MapPin, Star, BadgeDollarSign } from "lucide-react" // ✅ clean icons

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState()
  const { convert, currency } = useCurrency()

  useEffect(() => {
    if (hotel) GetPlacePhoto()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotel])

  const GetPlacePhoto = async () => {
    const data = { textQuery: hotel?.name }
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

  // ✅ Parse numeric price safely
  let basePrice = 0
  if (hotel?.price) {
    const match = hotel.price.match(/[\d,.]+/)
    if (match) {
      basePrice = parseFloat(match[0].replace(/,/g, ""))
    }
  }

  const convertedPrice =
    basePrice > 0 ? convert(basePrice, "USD", currency) : null

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel?.name},${hotel?.address}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 cursor-pointer">
        {/* Hotel Image with overlay + rating */}
        <div className="relative">
          <img
            src={photoUrl || "/placeholder.jpg"}
            alt={hotel?.name || "Hotel"}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>

          {/* Rating badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-semibold shadow">
            <Star className="h-3.5 w-3.5 fill-black" />
            {hotel?.rating || "N/A"}
          </div>
        </div>

        {/* Details */}
        <div className="p-4 space-y-2">
          {/* Hotel Name */}
          <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100 line-clamp-1">
            {hotel?.name}
          </h2>

          {/* Address */}
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
            <MapPin className="h-4 w-4 text-blue-500 shrink-0" />
            <span className="truncate">{hotel?.address}</span>
          </p>

          {/* Price */}
          {convertedPrice && (
            <div className="flex items-center gap-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {convertedPrice} {currency}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default HotelCardItem
