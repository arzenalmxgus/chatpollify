// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration using environment variables (for Vite)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBZbwpXoq1L_1rFDMdX_eMvze9XWCyibKc",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "chatpollify.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "chatpollify",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "chatpollify.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "496769647324",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:496769647324:web:925a3251e72cc5f1d4ea19",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-Q6J1729P3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence mode to browser local storage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence mode set to local storage");
  })
  .catch((error) => {
    console.error("Error setting persistence: ", error);
  });

// Export the Firebase services
export { app, analytics, auth, db };
