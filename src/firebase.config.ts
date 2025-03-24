import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import {getMessaging, getToken, onMessage} from "firebase/messaging"

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
const db = getFirestore(app)
const realtimeDb = getDatabase(app)

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const messaging = getMessaging(app);

const requestPermission = async () => {
  try {
    // Solicitar permissão para receber notificações
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: "SUA_VAPID_KEY" });
      console.log("Token do dispositivo:", token);
      // Armazene o token no Firestore ou no seu banco de dados para enviar notificações
      return token;
    } else {
      console.error("Permissão de notificações negada.");
    }
  } catch (error) {
    console.error("Erro ao solicitar permissão para notificações:", error);
  }
};

// Configurar recebimento de mensagens
onMessage(messaging, (payload) => {
  console.log("Mensagem recebida:", payload);
  // Exiba uma notificação no navegador
  const { title, body }: any = payload.notification;
  new Notification(title, { body });
});

export {auth, db, messaging, requestPermission, realtimeDb, googleProvider, facebookProvider, githubProvider}