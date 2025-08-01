// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 🔐 Replace this config with your own from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyD7SKlD2bZ-rqmFI16s3TK9cCjZmb7w8TQ",
  authDomain: "devmate-firebase.firebaseapp.com",
  projectId: "devmate-firebase",
  storageBucket: "devmate-firebase.firebasestorage.app",
  messagingSenderId: "335733459237",
  appId: "1:335733459237:web:9cf0641e911d5bc14972cc",
  measurementId: "G-2CPSVW8QHZ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
