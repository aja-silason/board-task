// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKnAYLcBWpvJwt-geUABAC-oD-hMXXWtQ",
  authDomain: "borad-task.firebaseapp.com",
  projectId: "borad-task",
  storageBucket: "borad-task.firebasestorage.app",
  messagingSenderId: "334127106823",
  appId: "1:334127106823:web:72dba0815009df061713a2",
  measurementId: "G-CT9L413LP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // Usar a instância existente
  }
  
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  
  export { auth, firestore };