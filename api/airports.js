export default async function handler(req, res) {
  const { keyword, max = 5 } = req.query;

  if (!keyword) {
    return res.status(400).json({ error: "keyword is required" });
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

    // Fetch airport data
    const airportRes = await fetch(
      `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${keyword}&page[limit]=${max}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const airportData = await airportRes.json();
    if (!airportData.data) {
      return res.status(404).json({ error: "No airports found" });
    }

    res.status(200).json(airportData.data);
  } catch (err) {
    console.error("Airport API error:", err.message);
    res.status(500).json({ error: err.message });
  }
}
