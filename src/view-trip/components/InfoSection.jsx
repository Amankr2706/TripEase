import React, { useEffect, useState } from "react"
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi"

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState()

  useEffect(() => {
    if (trip) GetPlacePhoto()
  }, [trip])

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    }
    await GetPlaceDetails(data).then((resp) => {
      if (resp.data.places[0]?.photos?.[3]?.name) {
        const PhotoUrl = PHOTO_REF_URL.replace(
          "{NAME}",
          resp.data.places[0].photos[3].name
        )
        setPhotoUrl(PhotoUrl)
      }
    })
  }

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
      {/* Hero Image */}
      <img
        src={photoUrl || "/placeholder.jpg"}
        alt="Destination"
        className="h-[360px] w-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-8 left-8 right-8">
        <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight text-white drop-shadow-xl">
          {trip?.userSelection?.location?.label || "Unknown Destination"}
        </h2>
      </div>
    </div>
  )
}

export default InfoSection
