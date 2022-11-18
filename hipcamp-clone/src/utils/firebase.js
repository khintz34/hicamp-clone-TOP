import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { set, push, onValue } from "firebase/database";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import bike from "../images/bike.jpeg";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAd7VP83Ldg66P-HN8Rc7-BCvt2tDbvJyo",
  authDomain: "hipcamp-93df7.firebaseapp.com",
  projectId: "hipcamp-93df7",
  storageBucket: "hipcamp-93df7.appspot.com",
  messagingSenderId: "444182668876",
  appId: "1:444182668876:web:e4aa214d6612d8e7e376e9",
  measurementId: "G-M3F46JFQMM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase();

const storage = getStorage();
const storageRef = ref(storage);
export const specRef = ref(storage, "test2.jpeg");

uploadBytes(specRef, { bike }).then((snapshot) => {
  console.log("okay");
});
