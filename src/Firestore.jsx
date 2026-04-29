

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCymXiodeP4c7eC25jFZsbea5rK0l8iD_8",

  authDomain: "mdimitrov-106b2.firebaseapp.com",

  projectId: "mdimitrov-106b2",

  storageBucket: "mdimitrov-106b2.firebasestorage.app",

  messagingSenderId: "683723816608",

  appId: "1:683723816608:web:d51ae48891670a5ada13c5"

};


// Initialize Firebase
//export function FirestoreFunctions()
//{
	export const app = initializeApp(firebaseConfig);
	export const auth = getAuth(app);
	export const db = getFirestore(app);
//}