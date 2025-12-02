<h1 align="center" style="font-weight: bold;"> Full-Stack AI Trip Planner Web App</h1>
<br>

<p align="center">
  A full-stack web application that helps travelers plan their trips effortlessly.  
  Powered by <b>Google Generative AI</b>, it creates smart itineraries, hotel recommendations, cost breakdowns, and more.  
  Built with <b>React</b>, <b>TailwindCSS</b>, <b>Firebase</b>, <b>Amadeus API</b>, <b>Google Places API</b>, and <b>Visual Crossing Weather API</b>.
</p>
<br>

<h2 id="technologies">💻 Technologies</h2>

<b><em>Frontend:</em></b>

- **React** — For building a fast and dynamic user interface.  
- **TailwindCSS** — For modern, responsive, and consistent styling.  
- **Axios / Fetch API** — For making API requests to external services.  

<b><em>Backend & Services:</em></b>

- **Google Generative AI (Gemini)** — Generates AI-powered travel recommendations and itineraries.  
- **Amadeus API** — Provides real-time flight search, pricing, and booking options.  
- **Google Places API** — Fetches place details, hotels, and high-quality photos.  
- **Visual Crossing Weather API** — Provides 7-day detailed weather forecasts.  
- **Firebase Firestore** — For persistent storage and retrieval of user trip data.  
- **Firebase Authentication** — For secure user login and authentication via Google OAuth.  
- **Vercel (Optional)** — For serverless deployment of backend API routes.  

<br>

<h2 id="features">🚀 Features</h2>

- 🌍 **AI-Powered Travel Plans** — Generate personalized travel itineraries and hotel recommendations using Google Generative AI.  
- ✈️ **Flight Search (Amadeus)** — Find and compare real-time flight options for your chosen destination.  
- 🏨 **Dynamic Place Information** — View detailed information and photos of places and hotels using Google Places API.  
- 🔍 **Explore More Nearby** — Discover nearby attractions and points of interest around your chosen destination.  
- ☀️ **Weather Forecast Integration** — Get a 7-day weather forecast to plan your activities better.  
- 🔐 **User Authentication** — Secure login with Google OAuth.  
- 🎨 **Interactive UI** — Clean, user-friendly, and responsive interface designed with TailwindCSS.  
- 💾 **Data Storage** — Save and manage user trips in Firebase Firestore.  
- 📅 **Travel Itineraries** — Daily plans including attractions, timings, and ticket pricing.  
- 💰 **Estimated Cost Breakdown** — Get a clear budget overview with categorized costs (flights, hotels, meals, activities, and total).  
- 📄 **Itinerary PDF Export** — Download your trip plan and cost breakdown as a professional PDF.  

<br>

### **Landing Page / Home Screen** :
<img width="1569" height="862" alt="Screenshot (16)" src="https://github.com/user-attachments/assets/a5fb15ee-d6f9-4eb1-87f3-f1da87ea6450" />

### **Login Page** :

### **Personalization Input** :
<img width="1601" height="863" alt="Screenshot (14)" src="https://github.com/user-attachments/assets/b3193363-19a6-4741-baa9-b020c8acdee6" />

### **AI Itinerary Generation** :
<img width="1749" height="858" alt="Screenshot (11)h" src="https://github.com/user-attachments/assets/b7b4a5f5-7d4d-4fa0-bb1d-a5f183a185f1" />

### **Weather Forecast & Flight Search** :
<img width="1729" height="717" alt="Screenshot (13)h" src="https://github.com/user-attachments/assets/bfd401e1-f6c4-4bfd-936a-3a0d01afcc45" />

### **Detailed Itinerary & Cost Breakdown** :
<img width="983" height="796" alt="Screenshot (12)" src="https://github.com/user-attachments/assets/58ae00f5-4e09-4b94-bf86-cb609f575e74" />

<br>

<h2 id="pre">🗁 Prerequisites</h2>

Before running the project, make sure you have:  

- ✅ **Node.js & npm** — Installed on your system.  
- ✅ **Firebase Project** — Create a Firebase project and enable:  
  - Firestore Database  
  - Google Authentication (for login/signup)  
- ✅ **API Keys**:  
  - Google Generative AI (Gemini) API key  
  - Google Places API key  
  - Amadeus API key (for flight search)  
  - Visual Crossing Weather API key  
- ✅ **Vercel / Local Server** (Optional) — For deploying serverless API routes.  
- ✅ **Environment Variables (.env.local)** — Store your API keys securely, e.g.:  
  ```env
  VITE_GOOGLE_AUTH_CLIENT_ID=your_google_auth_client_id
  VITE_GOOGLE_PLACE_API_KEY=your_google_places_key
  VITE_GEMINI_API_KEY=your_gemini_key
  VITE_AMADEUS_API_KEY=your_amadeus_key
  VITE_visualcrossing_KEY=your_visualcrossing_key
  VITE_FIREBASE_API_KEY=your_firebase_key
  VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
  VITE_FIREBASE_APP_ID=your_app_id
  VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
