// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAEjazI06KVyI8taKoRwk_FwHKj0VJurg",
  authDomain: "fir-bc903.firebaseapp.com",
  projectId: "fir-bc903",
  storageBucket: "fir-bc903.appspot.com",
  messagingSenderId: "909552721636",
  appId: "1:909552721636:web:390211903129163f8856f1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
