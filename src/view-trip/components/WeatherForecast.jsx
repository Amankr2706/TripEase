import React, { useEffect, useState } from "react";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function WeatherForecast({ trip }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const DAYS_PER_PAGE = 5;

  const fetchWeather = async (location) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          location
        )}?unitGroup=metric&key=${
          import.meta.env.VITE_VISUALCROSSING_KEY
        }&include=days`
      );
      const data = await res.json();
      if (data.days) {
        setForecast(data.days.slice(0, 7)); // 7 days max
      }
    } catch (err) {
      console.error("❌ Weather API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trip?.userSelection?.location) {
      const placeName =
        trip.userSelection.location.label ||
        trip.userSelection.location.value?.description ||
        "";
      if (placeName) fetchWeather(placeName);
    }
  }, [trip]);

  const getWeatherMeta = (condition) => {
    const c = condition?.toLowerCase() || "";
    if (c.includes("rain"))
      return {
        icon: <CloudRain className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
        bg: "bg-blue-50 dark:bg-neutral-800",
      };
    if (c.includes("snow"))
      return {
        icon: <CloudSnow className="w-6 h-6 text-sky-400 dark:text-sky-300" />,
        bg: "bg-sky-50 dark:bg-neutral-800",
      };
    if (c.includes("thunder"))
      return {
        icon: <CloudLightning className="w-6 h-6 text-gray-500 dark:text-gray-300" />,
        bg: "bg-gray-50 dark:bg-neutral-800",
      };
    if (c.includes("fog") || c.includes("mist"))
      return {
        icon: <CloudFog className="w-6 h-6 text-gray-400 dark:text-gray-300" />,
        bg: "bg-gray-50 dark:bg-neutral-800",
      };
    if (c.includes("cloud"))
      return {
        icon: <Cloud className="w-6 h-6 text-gray-500 dark:text-gray-300" />,
        bg: "bg-gray-50 dark:bg-neutral-800",
      };
    return {
      icon: <Sun className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />,
      bg: "bg-yellow-50 dark:bg-neutral-800",
    };
  };

  const getAdvice = () => {
    const goodDays = forecast
      .filter(
        (d) =>
          d.conditions.toLowerCase().includes("sun") ||
          d.conditions.toLowerCase().includes("clear")
      )
      .map((d) =>
        new Date(d.datetime).toLocaleDateString("en-US", { weekday: "short" })
      );

    if (goodDays.length === 0) return null;
    if (goodDays.length === 1)
      return `Best day for sightseeing: ${goodDays[0]}.`;
    return `Best days for sightseeing: ${goodDays.slice(0, 2).join(" & ")}.`;
  };

  const start = page * DAYS_PER_PAGE;
  const visibleDays = forecast.slice(start, start + DAYS_PER_PAGE);

  return (
    <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            Weather Forecast
          </h2>
          {trip?.userSelection?.location?.label && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {trip.userSelection.location.label}
            </p>
          )}
        </div>

        {forecast.length > DAYS_PER_PAGE && (
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
                  Math.min(p + 1, Math.ceil(forecast.length / DAYS_PER_PAGE) - 1)
                )
              }
              disabled={start + DAYS_PER_PAGE >= forecast.length}
              className="p-2 bg-gray-200 dark:bg-neutral-700 rounded-full disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-neutral-600 transition"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
        )}
      </div>

      {!trip?.userSelection?.location ? (
        <p className="text-gray-500">No location data available for this trip.</p>
      ) : loading ? (
        <p className="text-gray-500">Loading weather...</p>
      ) : forecast.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {visibleDays.map((day, idx) => {
              const meta = getWeatherMeta(day.conditions);
              const isToday = start + idx === 0;
              return (
                <div
                  key={idx}
                  className={`rounded-xl p-4 text-center transition hover:scale-105 hover:shadow-md ${meta.bg} ${
                    isToday
                      ? "ring-1 ring-neutral-300 dark:ring-neutral-600"
                      : ""
                  }`}
                >
                  <p className="font-medium text-neutral-700 dark:text-neutral-200">
                    {isToday
                      ? "Today"
                      : new Date(day.datetime).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                  </p>
                  <div className="flex justify-center my-2">{meta.icon}</div>
                  <p className="text-sm text-gray-500">{day.conditions}</p>
                  <p className="font-semibold text-neutral-800 dark:text-neutral-100 mt-1">
                    {Math.round(day.tempmax)}° / {Math.round(day.tempmin)}°
                  </p>
                </div>
              );
            })}
          </div>

          {getAdvice() && (
            <div className="mt-6 text-center text-sm text-neutral-700 dark:text-neutral-300">
              {getAdvice()}
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">No forecast available.</p>
      )}
    </section>
  );
}

export default WeatherForecast;
