import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBNhUvqflu0RzPUIegu-pzLDo7SHypgoZU",
  authDomain: "ai-trip-planner-aaa37.firebaseapp.com",
  projectId: "ai-trip-planner-aaa37",
  storageBucket: "ai-trip-planner-aaa37.firebasestorage.app",
  messagingSenderId: "976961084445",
  appId: "1:976961084445:web:50109fbc33a194dfb23af4",
  measurementId: "G-QYKW0ZBZ92"
};

// ✅ Initialize Firebase
export const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore & Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

// ✅ Add Google Auth Provider (this fixes your import error)
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account", // optional: always ask user to pick account
});

// ✅ Optional: Analytics (only in browser)
export let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
