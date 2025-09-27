import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  "projectId": "studio-4909750864-e5810",
  "appId": "1:507330990103:web:e78b2dd9b77bc8978d8c52",
  "apiKey": "AIzaSyCJeSqp4bDLVgqFGcGspbPANr21zSdon1A",
  "authDomain": "studio-4909750864-e5810.firebaseapp.com",
  "storageBucket": "studio-4909750864-e5810.appspot.com",
  "messagingSenderId": "507330990103",
  "measurementId": "G-8V63ZJ64V3",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
