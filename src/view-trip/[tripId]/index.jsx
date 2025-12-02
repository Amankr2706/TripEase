import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';

import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import DownloadPDF from '../components/DownloadPdf';
import FlightRecommendations from '../components/FlightRecommendations';
import CostBreakdown from '../components/CostBreakdown';
import { CurrencyProvider } from '@/context/CurrencyContext';
import CurrencySelector from '../components/CurrencySelector';
import ExploreMore from '../components/ExploreMore';
import WeatherForecast from '../components/WeatherForecast';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (tripId) GetTripData();
  }, [tripId]);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);


  const GetTripData = async () => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      toast.error('No trip found');
    }
  };

  if (!trip) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 dark:text-gray-300">
        Loading trip details...
      </div>
    );
  }

  return (
    <CurrencyProvider>
      <div className="flex flex-col lg:flex-row pt-24 px-4 sm:px-6 lg:px-12 xl:px-20 gap-10">
        {/* LEFT SIDEBAR */}
        <aside className="lg:w-1/3 lg:max-w-sm flex-shrink-0">
          <div className="lg:sticky lg:top-24 flex flex-col gap-6 h-fit lg:h-[calc(100vh-6rem)]">
            {/* Banner */}
            <InfoSection trip={trip} />

            {/* Cost breakdown */}
            {trip.tripData?.cost_breakdown && (
              <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 p-6 space-y-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                    Estimated Cost
                  </h2>
                  <CurrencySelector />
                </div>
                <CostBreakdown cost={trip.tripData.cost_breakdown} />
              </section>
            )}

            {/* Download PDF */}
            <div>
              <DownloadPDF trip={trip} />
            </div>
            {/* Small spacer below footer */}
          <div className="h-5" />
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1 space-y-10">
          {/* Hotels */}
          <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 p-6 space-y-6">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              Recommended Hotels
            </h2>
            <Hotels trip={trip} />
          </section>

          {/* Daily Plan */}
          <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 p-6 space-y-6">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            Travel Plan
            </h2>
            <PlacesToVisit trip={trip} />
          </section>

          {/* Explore More section */}
          <section >
           <ExploreMore trip={trip} />
           </section>

           <WeatherForecast trip={trip}/>




          {/* Flights */}
          <section className="bg-white dark:bg-neutral-900 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-800 p-6 space-y-6">
            <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
              Search Flights
            </h2>
            <FlightRecommendations trip={trip} />
          </section>

          {/* Footer */}
          <Footer trip={trip} />

          {/* Small spacer below footer */}
          <div className="h-2" />
        </main>
      </div>
    </CurrencyProvider>
  );
}

export default Viewtrip;
