export default async function handler(req, res) {
  const { origin, destination, departureDate, adults = 1, max = 5 } = req.query;

  if (!origin || !destination || !departureDate) {
    return res.status(400).json({
      error: "origin, destination, and departureDate are required",
    });
  }

  try {
    // Get access token (inline)
    const tokenRes = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.VITE_AMADEUS_API_KEY,
          client_secret: process.env.VITE_AMADEUS_API_SECRET,
        }),
      }
    );

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) throw new Error("Failed to get access token");

    // Fetch flights
    const flightRes = await fetch(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&max=${max}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const flightData = await flightRes.json();
    res.status(200).json(flightData);
  } catch (err) {
    console.error("Flights API error:", err.message);
    res.status(500).json({ error: err.message });
  }
}
