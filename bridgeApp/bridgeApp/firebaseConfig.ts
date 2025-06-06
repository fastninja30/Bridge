// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtrYLIIpPUE9H30hnhFBVWNaDeDxyxb70",
  authDomain: "bridge-25a39.firebaseapp.com",
  projectId: "bridge-25a39",
  storageBucket: "bridge-25a39.firebasestorage.app",
  messagingSenderId: "262967449022",
  appId: "1:262967449022:web:976a89df1f1b211f8cd5ef",
  measurementId: "G-Y63N711Y11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);