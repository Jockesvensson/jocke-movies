import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAVN5aEoA4tXnuVxVxNI6tCFYaPsAiyfUk",
    authDomain: "jocke-movies.firebaseapp.com",
    projectId: "jocke-movies",
    storageBucket: "jocke-movies.appspot.com",
    messagingSenderId: "526984546183",
    appId: "1:526984546183:web:61f0ba17282e99dd2f3522",
    measurementId: "G-VLWTNS5QYW"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// apiKey: process.env.REACT_APP_API_KEY,
// authDomain: process.env.REACT_APP_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_PROJECT_ID,
// storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// appId: process.env.REACT_APP_APP_ID,
// measurementId: process.env.REACT_APP_MEASUREMENT_ID