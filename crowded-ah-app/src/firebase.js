// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore"; // Import getFirestore for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYigGKAMVVTTtC6E_2nn0OniNuETkXAW8",
  authDomain: "crowded-ah-firestore.firebaseapp.com",
  databaseURL: "https://crowded-ah-firestore-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crowded-ah-firestore",
  storageBucket: "crowded-ah-firestore.appspot.com",
  messagingSenderId: "612812453338",
  appId: "1:612812453338:web:0b378eef31269d62037ce3",
  measurementId: "G-4DHMD2CQF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize the Auth object
const db = getFirestore(app);

export { auth , db };