// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  "projectId": "studio-4909750864-e5810",
  "appId": "1:507330990103:web:e78b2dd9b77bc8978d8c52",
  "apiKey": "AIzaSyCJeSqp4bDLVgqFGcGspbPANr21zSdon1A",
  "authDomain": "studio-4909750864-e5810.firebaseapp.com",
  "measurementId": "",
  "storageBucket": "studio-4909750864-e5810.appspot.com",
  "messagingSenderId": "507330990103"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
