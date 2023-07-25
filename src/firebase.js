// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBokbA7h2YEhSpqbHM3hwihGKE8_mRe82I",
  authDomain: "accountingapp-2a8e6.firebaseapp.com",
  projectId: "accountingapp-2a8e6",
  storageBucket: "accountingapp-2a8e6.appspot.com",
  messagingSenderId: "293152638221",
  appId: "1:293152638221:web:7142332992170f7e581c44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
