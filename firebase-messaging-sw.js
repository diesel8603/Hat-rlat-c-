importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB0wYo4y9xi1lZSwi02iJQ7v0iZ-nq8y-U",
  authDomain: "chat-f5f0c.firebaseapp.com",
  projectId: "chat-f5f0c",
  storageBucket: "chat-f5f0c.firebasestorage.app",
  messagingSenderId: "571398938754",
  appId: "1:571398938754:web:147a9e1d0106e8a0a4d49b"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png',
    vibrate: [200, 100, 200]
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
