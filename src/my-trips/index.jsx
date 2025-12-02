import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "@/service/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";
import { Button } from "@/components/ui/button";
import { Plane, X } from "lucide-react";

function MyTrips() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Watch Firebase Auth state instead of using localStorage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        navigate("/");
        return;
      }
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Load trips only when user is available
  useEffect(() => {
    if (user?.email) {
      GetUserTrips(user.email);
    }
  }, [user]);

  const GetUserTrips = async (email) => {
    setLoading(true);
    try {
      const q = query(collection(db, "AITrips"), where("userEmail", "==", email));
      const querySnapshot = await getDocs(q);
      let trips = [];
      querySnapshot.forEach((docSnap) => {
        trips.push({ id: docSnap.id, ...docSnap.data() });
      });
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (tripId) => {
    try {
      await deleteDoc(doc(db, "AITrips", tripId));
      setUserTrips(userTrips.filter((trip) => trip.id !== tripId));
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 px-5 py-20 bg-background text-foreground transition-colors">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="font-extrabold text-3xl md:text-5xl text-neutral-900 dark:text-neutral-100">
          My Trips
        </h2>
        <p className="text-lg text-gray-600 dark:text-neutral-300">
          All your generated travel plans are saved here. Pick up right where you left off.
        </p>
      </div>

      {/* Trips List */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[250px] w-full bg-gray-200 dark:bg-neutral-800 animate-pulse rounded-xl shadow-sm"
            ></div>
          ))
        ) : userTrips.length > 0 ? (
          userTrips.map((trip) => (
            <div key={trip.id} className="relative">
              <UserTripCardItem trip={trip} />
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(trip.id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-white dark:bg-neutral-900 shadow hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center text-center mt-10">
            <Plane className="w-12 h-12 text-gray-400" />
            <h3 className="mt-4 text-xl font-semibold">No trips yet</h3>
            <p className="text-gray-500 mt-2">
              Start planning your next adventure and your trips will appear here.
            </p>
            <Button
              className="mt-6 px-6 py-3 text-lg rounded-xl shadow-md hover:shadow-lg"
              onClick={() => navigate("/create-trip")}
            >
              Create a Trip
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
