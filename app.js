// Firebase config
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
const statusEl = document.getElementById('status');

// Service Worker kaydı
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('firebase-messaging-sw.js')
    .then((registration) => {
      console.log('SW kaydedildi:', registration);
      messaging.useServiceWorker(registration);

      // İzin iste
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          messaging.getToken({ vapidKey: '🔥 BURAYA Firebase Console’dan aldığın Web Push Sertifikası (VAPID key) gelecek 🔥' })
            .then((token) => {
              console.log("FCM Token:", token);
              statusEl.innerHTML = "Bildirim izni verildi.<br>Token: <br>" + token;
              // Bu token'ı sunucuya kaydet
            });
        } else {
          statusEl.textContent = "Bildirim izni verilmedi.";
        }
      });
    })
    .catch(err => console.error('SW hatası:', err));
}

// Formdan saat seçme
document.getElementById('reminderForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const time = document.getElementById('reminderTime').value;
  statusEl.textContent = `Hatırlatma saati kaydedildi: ${time}`;
  // Burada bu zamanı sunucuya gönderip FCM ile planlama yapılmalı
});

// Gelen bildirimleri dinle (site açıkken)
messaging.onMessage((payload) => {
  console.log('Bildirim geldi (ön plan):', payload);
  const audio = document.getElementById('reminderSound');
  audio.play();
  new Notification(payload.notification.title, payload.notification);
});
