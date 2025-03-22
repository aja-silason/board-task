import { initializeApp } from "firebase/app";

import {FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_APIKEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJEDT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export {auth, googleProvider, facebookProvider, githubProvider}