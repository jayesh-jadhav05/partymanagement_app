// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwDatymjkewqXpnJMo_1aovolyzgfZaw8",
  authDomain: "accounting-app-c53cd.firebaseapp.com",
  projectId: "accounting-app-c53cd",
  storageBucket: "accounting-app-c53cd.appspot.com",
  messagingSenderId: "874763539277",
  appId: "1:874763539277:web:2888d7968e4427fb575d04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
