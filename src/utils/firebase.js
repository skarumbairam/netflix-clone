// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_BASE,
  authDomain: "netflix-clone-7025f.firebaseapp.com",
  projectId: "netflix-clone-7025f",
  storageBucket: "netflix-clone-7025f.appspot.com",
  messagingSenderId: "696621426448",
  appId: "1:696621426448:web:177ee21dde5e1d53aea795",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
