/**
 * @fileoverview Initializes Firebase app with configuration
 * Provides core Firebase functionality, including Authentication and Firestore database access.
 * @author Leow Yi Shian
 */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth , db };