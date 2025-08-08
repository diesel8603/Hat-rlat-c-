importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyB0wYo4y9xi1lZSwi02iJQ7v0iZ-nq8y-U",
  authDomain: "chat-f5f0c.firebaseapp.com",
  databaseURL: "https://chat-f5f0c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-f5f0c",
  storageBucket: "chat-f5f0c.firebasestorage.app",
  messagingSenderId: "571398938754",
  appId: "1:571398938754:web:147a9e1d0106e8a0a4d49b",
  measurementId: "G-CFZ8PWP6DY"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[SW] Arka planda bildirim:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon || 'icon.png'
  });
});
