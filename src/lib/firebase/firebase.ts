// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "skillsync-8127x",
  appId: "1:10610896891:web:11d9df29aa1d1a6c46e55e",
  storageBucket: "skillsync-8127x.firebasestorage.app",
  apiKey: "AIzaSyAatDrKW50h9W9_MWHGUk-JsYjW5OHDAUk",
  authDomain: "skillsync-8127x.firebaseapp.com",
  messagingSenderId: "10610896891"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
