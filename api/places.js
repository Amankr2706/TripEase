//api/places.js
export default async function handler(req, res) {
  try {
    const { lat, lng, radius = 5000, locationName = "" } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "lat and lng are required" });
    }

    const apiKey = process.env.VITE_GOOGLE_PLACE_API_KEY;

    let results = [];

    // 🔎 Detect if user entered a broad location (like "China")
    const isBroadLocation =
      locationName &&
      (locationName.split(" ").length <= 2 || locationName.length > 15);

    // ✅ Try Nearby Search first (for cities/landmarks)
    if (!isBroadLocation) {
      const nearbyUrl = new URL(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
      );
      nearbyUrl.searchParams.set("location", `${lat},${lng}`);
      nearbyUrl.searchParams.set("radius", radius);
      nearbyUrl.searchParams.set("type", "tourist_attraction");
      nearbyUrl.searchParams.set("key", apiKey);

      const nearbyRes = await fetch(nearbyUrl.toString());
      const nearbyData = await nearbyRes.json();
      results = nearbyData.results || [];
    }

    // 🚨 Fallback: if broad country OR no results → use Text Search
    if (results.length === 0) {
      const textUrl = new URL(
        "https://maps.googleapis.com/maps/api/place/textsearch/json"
      );
      textUrl.searchParams.set(
        "query",
        `top tourist attractions in ${locationName || "this area"}`
      );
      textUrl.searchParams.set("location", `${lat},${lng}`);
      textUrl.searchParams.set("radius", radius * 10);
      textUrl.searchParams.set("key", apiKey);

      const textRes = await fetch(textUrl.toString());
      const textData = await textRes.json();
      results = textData.results || [];
    }

    // 🧹 Filter out irrelevant categories
    const bannedTypes = [
      "bus_station",
      "subway_station",
      "train_station",
      "grocery_or_supermarket",
      "store",
      "school",
      "local_government_office",
      "pharmacy",
    ];

    results = results.filter(
      (place) => !place.types?.some((t) => bannedTypes.includes(t))
    );

    return res.status(200).json({ results });
  } catch (error) {
    console.error("❌ Vercel API error:", error);
    return res.status(500).json({ error: "Failed to fetch places" });
  }
}
