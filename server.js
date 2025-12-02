import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// ✅ Nearby + Text Search hybrid
app.get("/api/places", async (req, res) => {
  const { lat, lng, radius = 5000, locationName = "" } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "lat and lng are required" });
  }

  try {
    let results = [];

    // 🔎 If location is a big country/region, skip nearbySearch → use Text Search
    const isBroadLocation =
      locationName &&
      (locationName.split(" ").length <= 2 || locationName.length > 15);

    if (!isBroadLocation) {
      const nearbyUrl = new URL(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
      );
      nearbyUrl.searchParams.set("location", `${lat},${lng}`);
      nearbyUrl.searchParams.set("radius", radius);
      nearbyUrl.searchParams.set("type", "tourist_attraction");
      nearbyUrl.searchParams.set("key", process.env.VITE_GOOGLE_PLACE_API_KEY);

      const nearbyRes = await fetch(nearbyUrl.toString());
      const nearbyData = await nearbyRes.json();
      results = nearbyData.results || [];
    }

    // 🚨 If no results OR location is broad → fallback to Text Search
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
      textUrl.searchParams.set("key", process.env.VITE_GOOGLE_PLACE_API_KEY);

      const textRes = await fetch(textUrl.toString());
      const textData = await textRes.json();
      results = textData.results || [];
    }

    // 🧹 Clean irrelevant categories
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

    res.json({ results });
  } catch (error) {
    console.error("❌ Places API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

// ✅ Start server
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
