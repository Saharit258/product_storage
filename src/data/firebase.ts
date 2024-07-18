// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTRXW5ThZhaFRt_dAlTkq1JAqicQmam5k",
  authDomain: "productstorge.firebaseapp.com",
  projectId: "productstorge",
  storageBucket: "productstorge.appspot.com",
  messagingSenderId: "1074656225018",
  appId: "1:1074656225018:web:ee942772f4e5533a7a0b43",
  measurementId: "G-R8NBSNQKZL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getFirestore(app);
