// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 Add this
const firebaseConfig = {
  apiKey: "AIzaSyB_K-L2lwKEuCjurjMWFw13IE9V8rdbneI",
  authDomain: "clone-5af24.firebaseapp.com",
  projectId: "clone-5af24",
  storageBucket: "clone-5af24.appspot.com",
  messagingSenderId: "874730105426",
  appId: "1:874730105426:web:2876110bdbe97c89994d8b",
  measurementId: "G-20QVSQ79YZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // 👈 Add this

export { auth,db,app, createUserWithEmailAndPassword, signInWithEmailAndPassword };
