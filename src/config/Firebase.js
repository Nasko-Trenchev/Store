
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {

  apiKey: "AIzaSyDnNii-lE7hTwheGOzIcPTx4x5j9Dsh2gc",

  authDomain: "learningfirabasepedrotech.firebaseapp.com",

  projectId: "learningfirabasepedrotech",

  storageBucket: "learningfirabasepedrotech.appspot.com",

  messagingSenderId: "1084739884382",

  appId: "1:1084739884382:web:06b761d1eac2365350ebcf"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);