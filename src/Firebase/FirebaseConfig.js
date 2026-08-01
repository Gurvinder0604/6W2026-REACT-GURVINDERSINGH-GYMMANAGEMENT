// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXnyC50oFERFGFISdzP24our5eBehUsE0",
  authDomain: "gym-management-system-5aa2c.firebaseapp.com",
  projectId: "gym-management-system-5aa2c",
  storageBucket: "gym-management-system-5aa2c.firebasestorage.app",
  messagingSenderId: "426494261003",
  appId: "1:426494261003:web:f94ebb2f6398cd4ccc940e"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)