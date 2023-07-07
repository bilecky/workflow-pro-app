// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuHsASM-G83M4RVES8yJ-ybyXmgAr1EJE",
  authDomain: "workflow-app-11aff.firebaseapp.com",
  projectId: "workflow-app-11aff",
  storageBucket: "workflow-app-11aff.appspot.com",
  messagingSenderId: "1043760998191",
  appId: "1:1043760998191:web:ceeb4aecce6ecdc96f63da",
  measurementId: "G-BX8FVLX36Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
