// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY-zB020-96OdwYzWhThO878KqjyvHsR0",
  authDomain: "news-aggregator-9b632.firebaseapp.com",
  projectId: "news-aggregator-9b632",
  storageBucket: "news-aggregator-9b632.firebasestorage.app",
  messagingSenderId: "671047995807",
  appId: "1:671047995807:web:725ae1bca1a4a7639d2daa",
  measurementId: "G-6Q0HDL28RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };