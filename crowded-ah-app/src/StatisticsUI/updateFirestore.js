import { setDoc, doc } from "firebase/firestore"; // Import Firestore functions
import { db } from '../firebase.js'; // Import the Firestore instance

// Example function to add a document to Firestore
export async function addCrowdData() {
  try {
    await setDoc(doc(db, "Weekly Train Crowd Levels", "LA"), {
      Station: "CC1",
      StartTime: "2024-10-25T23:50:00+08:00",
      EndTime: "2024-10-26T00:00:00+08:00",
      CrowdLevel: "l"
    });
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}
