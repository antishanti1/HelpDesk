import { initializeApp } from "firebase/app";
import {
  getAuth,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHdaapIe8k0nSsGx067v_q9V4Mrye7AwM",
  authDomain: "zealthyhelpdesk.firebaseapp.com",
  projectId: "zealthyhelpdesk",
  storageBucket: "zealthyhelpdesk.appspot.com",
  messagingSenderId: "45178847876",
  appId: "1:45178847876:web:30049eecb3e53f392f38d1",
  measurementId: "G-4BR5FZ1SHS",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);

export { doc, setDoc, getFirestore, firebase };
