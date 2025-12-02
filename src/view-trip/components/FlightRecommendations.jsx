import React, { useState } from "react";

export default function FlightRecommendation() {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    adults: 1,
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // For airport suggestions
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // Trigger airport autocomplete
    if (e.target.name === "origin") {
      fetchAirports(e.target.value, "origin");
    } else if (e.target.name === "destination") {
      fetchAirports(e.target.value, "destination");
    }
  };

  // Fetch airports from Amadeus API
const fetchAirports = async (keyword, field) => {
  if (!keyword || keyword.length < 3) {
    if (field === "origin") setOriginSuggestions([]);
    if (field === "destination") setDestinationSuggestions([]);
    return;
  }

  try {
    const res = await fetch(
      `/api/airports?keyword=${keyword}`
    );
    const data = await res.json(); // ✅ this is already an array!

    if (field === "origin") setOriginSuggestions(data || []);
    if (field === "destination") setDestinationSuggestions(data || []);
  } catch (err) {
    console.error("Error fetching airports:", err);
  }
};


  const selectAirport = (airport, field) => {
    setForm({
      ...form,
      [field]: airport.iataCode,
    });
    if (field === "origin") setOriginSuggestions([]);
    if (field === "destination") setDestinationSuggestions([]);
  };

  const searchFlights = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFlights([]);

    try {
      const res = await fetch(
        `/api/flights?origin=${form.origin}&destination=${form.destination}&departureDate=${form.departureDate}&adults=${form.adults}&max=5`
      );

      if (!res.ok) throw new Error("Failed to fetch flights");

      const data = await res.json();

      if (!data.data || data.data.length === 0) {
        setError("No flights found");
        return;
      }

      setFlights(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border rounded-2xl shadow-md my-8 bg-white dark:bg-gray-900 dark:border-gray-700">

      {/* Search Form */}
      <form
        onSubmit={searchFlights}
        className="grid grid-cols-2 gap-4 mb-6 text-gray-800 dark:text-gray-200"
      >
        {/* ORIGIN */}
        <div className="relative">
          <input
            type="text"
            name="origin"
            placeholder="Origin (city or airport)"
            value={form.origin}
            onChange={handleChange}
            className="border rounded-xl px-3 py-2 w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          {originSuggestions.length > 0 && (
            <div className="absolute z-10 bg-white dark:bg-gray-800 border rounded-xl mt-1 w-full max-h-40 overflow-y-auto shadow">
              {originSuggestions.map((airport) => (
                <div
                  key={airport.id}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => selectAirport(airport, "origin")}
                >
                  <p className="font-medium">
                    {airport.name} ({airport.iataCode})
                  </p>
                  <p className="text-xs text-gray-500">
                    {airport.address?.cityName}, {airport.address?.countryName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DESTINATION */}
        <div className="relative">
          <input
            type="text"
            name="destination"
            placeholder="Destination (city or airport)"
            value={form.destination}
            onChange={handleChange}
            className="border rounded-xl px-3 py-2 w-full bg-gray-50 dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          {destinationSuggestions.length > 0 && (
            <div className="absolute z-10 bg-white dark:bg-gray-800 border rounded-xl mt-1 w-full max-h-40 overflow-y-auto shadow">
              {destinationSuggestions.map((airport) => (
                <div
                  key={airport.id}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => selectAirport(airport, "destination")}
                >
                  <p className="font-medium">
                    {airport.name} ({airport.iataCode})
                  </p>
                  <p className="text-xs text-gray-500">
                    {airport.address?.cityName}, {airport.address?.countryName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DATE + ADULTS */}
        <input
          type="date"
          name="departureDate"
          value={form.departureDate}
          onChange={handleChange}
          className="border rounded-xl px-3 py-2 col-span-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input
          type="number"
          name="adults"
          min="1"
          value={form.adults}
          onChange={handleChange}
          className="border rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          className="col-span-1 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition"
        >
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </form>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Results */}
      <div>
        {flights.length > 0 && !loading ? (
          <ul className="space-y-4">
            {flights.map((flight, idx) => {
              const price = flight.price?.total || "N/A";
              const itinerary = flight.itineraries?.[0] || {};
              const segments = itinerary.segments || [];
              if (segments.length === 0) return null;

              const from = segments[0]?.departure?.iataCode || "";
              const to = segments[segments.length - 1]?.arrival?.iataCode || "";
              const depTime = new Date(
                segments[0]?.departure?.at
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              const arrTime = new Date(
                segments[segments.length - 1]?.arrival?.at
              ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
              const airline = segments[0]?.carrierCode || "XX";

              const bookingLink = `https://www.google.com/search?q=${airline}+flight+${from}+to+${to}+${segments[0]?.departure?.at?.split("T")[0]}`;

              return (
                <li
                  key={idx}
                  className="p-4 border rounded-xl shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`https://content.airhex.com/content/logos/airlines_${airline}_50_50_s.png`}
                      alt={airline}
                      className="w-10 h-10 rounded-full border"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <div>
                      <p className="font-semibold text-lg">
                        {from} → {to}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {depTime} - {arrTime} · {segments.length - 1} stop(s)
                      </p>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      ${price}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      per adult
                    </p>
                    <a
                      href={bookingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded transition"
                    >
                      Book Now
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          !loading && (
            <p className="text-gray-500 dark:text-gray-400">
              No flights found yet.
            </p>
          )
        )}
      </div>
    </div>
  );
}
