import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ExploreMore({ trip }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const PLACES_PER_PAGE = 3;

  const getCoordinates = async (placeIdOrName) => {
    try {
      const isPlaceId = placeIdOrName?.startsWith("ChI");
      const param = isPlaceId
        ? `place_id=${placeIdOrName}`
        : `address=${encodeURIComponent(placeIdOrName)}`;

      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${param}&key=${
          import.meta.env.VITE_GOOGLE_PLACE_API_KEY
        }`
      );
      const data = await res.json();
      if (data.results?.length > 0) {
        return data.results[0].geometry.location;
      }
    } catch (err) {
      console.error("❌ Geocode error:", err);
    }
    return null;
  };

  const fetchPlaces = async (lat, lng, locationName) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/places?lat=${lat}&lng=${lng}&radius=5000&locationName=${encodeURIComponent(
          locationName
        )}`
      );
      const data = await res.json();
      if (data.results) {
        setPlaces(data.results);
      }
    } catch (err) {
      console.error("❌ ExploreMore error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadPlaces = async () => {
      if (trip?.userSelection?.location) {
        const placeId = trip.userSelection.location.value?.place_id;
        const placeName =
          trip.userSelection.location.label ||
          trip.userSelection.location.value?.description ||
          "";
        const coords = await getCoordinates(placeId || placeName);
        if (coords) fetchPlaces(coords.lat, coords.lng, placeName);
      }
    };
    loadPlaces();
  }, [trip]);

  const start = page * PLACES_PER_PAGE;
  const visiblePlaces = places.slice(start, start + PLACES_PER_PAGE);

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
          Explore More
        </h2>
        {places.length > PLACES_PER_PAGE && (
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 0))}
              disabled={page === 0}
              className="p-2 bg-gray-200 dark:bg-neutral-700 rounded-full disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-neutral-600 transition"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
            <button
              onClick={() =>
                setPage((p) =>
                  Math.min(p + 1, Math.ceil(places.length / PLACES_PER_PAGE) - 1)
                )
              }
              disabled={start + PLACES_PER_PAGE >= places.length}
              className="p-2 bg-gray-200 dark:bg-neutral-700 rounded-full disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-neutral-600 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        )}
      </div>

      {loading && (
        <p className="text-gray-500">Loading nearby attractions...</p>
      )}
      {!loading && places.length === 0 && (
        <p className="text-gray-500">No nearby places found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visiblePlaces.map((place) => {
          const mapsUrl = place.place_id
            ? `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                place.name
              )}`;
          return (
            <a
              key={place.place_id}
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-neutral-900 
                         rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 
                         overflow-hidden transition 
                         hover:shadow-md hover:bg-neutral-50 dark:hover:bg-neutral-800 
                         hover:ring-1 hover:ring-neutral-300 dark:hover:ring-neutral-600"
            >
              {place.photos?.[0] ? (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${place.photos[0].photo_reference}&key=${
                    import.meta.env.VITE_GOOGLE_PLACE_API_KEY
                  }`}
                  alt={place.name}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 flex items-center justify-center text-gray-400 text-sm bg-neutral-100 dark:bg-neutral-800">
                  📍 No Image Available
                </div>
              )}
              <div className="p-3">
                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 truncate">
                  {place.name}
                </h3>
                <p className="text-sm text-gray-500">{place.vicinity}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default ExploreMore;
