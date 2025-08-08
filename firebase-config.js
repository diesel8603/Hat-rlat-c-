import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB0wYo4y9xi1lZSwi02iJQ7v0iZ-nq8y-U",
  authDomain: "chat-f5f0c.firebaseapp.com",
  projectId: "chat-f5f0c",
  storageBucket: "chat-f5f0c.firebasestorage.app",
  messagingSenderId: "571398938754",
  appId: "1:571398938754:web:147a9e1d0106e8a0a4d49b"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  if(permission !== 'granted') {
    throw new Error('Bildirim izni reddedildi.');
  }
}

export async function getFcmToken(vapidKey) {
  try {
    return await getToken(messaging, { vapidKey });
  } catch(e) {
    console.error('Token alınamadı:', e);
    return null;
  }
}
