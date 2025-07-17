// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJUzdbMiMzzFxC55IOWCfRCSKUA9M0iL0",
  authDomain: "tournaments-app-dev.firebaseapp.com",
  projectId: "tournaments-app-dev",
  storageBucket: "tournaments-app-dev.firebasestorage.app",
  messagingSenderId: "274077239567",
  appId: "1:274077239567:web:29d47371deef6265a7567a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth};