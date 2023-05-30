// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL4dLKRBRKq_BHQqVGzh9asUihe80-ZLc",
  authDomain: "event-app-d5243.firebaseapp.com",
  projectId: "event-app-d5243",
  storageBucket: "event-app-d5243.appspot.com",
  messagingSenderId: "309138261189",
  appId: "1:309138261189:web:7088e2e8249e0dcc1adcac",
  measurementId: "G-FSVM4DKYFX",
};

// Initialize Firebase
initializeApp(firebaseConfig);
