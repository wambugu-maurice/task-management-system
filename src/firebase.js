// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8nPfZTcbYst0vsCoQ7R016uDmoCR086w",
  authDomain: "project-management-c3e30.firebaseapp.com",
  projectId: "project-management-c3e30",
  storageBucket: "project-management-c3e30.firebasestorage.app",
  messagingSenderId: "580386192253",
  appId: "1:580386192253:web:7f30d2a02c0627e9dcea14",
  measurementId: "G-KTRGB4GCSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)