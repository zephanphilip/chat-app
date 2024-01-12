// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpSLwIivu8D5P_PSZToNCWLlR_T6lRaTg",
  authDomain: "chat-app-322ad.firebaseapp.com",
  projectId: "chat-app-322ad",
  storageBucket: "chat-app-322ad.appspot.com",
  messagingSenderId: "510196736173",
  appId: "1:510196736173:web:a1e9e7079ec69a70726624",
  measurementId: "G-VKCG0SPQ6V"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app);