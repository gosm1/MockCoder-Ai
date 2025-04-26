// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAJeVHdxX9zeLerPsQlhR4t73pGLUWvkvM",
    authDomain: "mockcoderai.firebaseapp.com",
    projectId: "mockcoderai",
    storageBucket: "mockcoderai.firebasestorage.app",
    messagingSenderId: "864821970265",
    appId: "1:864821970265:web:a999b4c9d336689e14f848",
    measurementId: "G-JM3Y0J2LFG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
