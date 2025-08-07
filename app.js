document.addEventListener('DOMContentLoaded', () => {
  // Firebase bilgilerini buraya kendi bilgilerinle değiştir
  const firebaseConfig = {
    apiKey: "AIzaSyBXXXCLGe70id54wlMhUtHQHOJe8l4a6wA",
    authDomain: "live-chat-9d81c.firebaseapp.com",
    databaseURL: "https://live-chat-9d81c-default-rtdb.firebaseio.com",
    projectId: "live-chat-9d81c",
    storageBucket: "live-chat-9d81c.appspot.com",
    messagingSenderId: "253242248304",
    appId: "1:253242248304:web:3e440995fe27bc8e2fb8b5"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  const messaging = firebase.messaging();

  // Service Worker kaydı
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(registration => {
        messaging.useServiceWorker(registration);
        console.log('Service Worker kayıt başarılı');
      })
      .catch(err => console.error('Service Worker kayıt hatası:', err));
  } else {
    console.warn('Tarayıcı Service Worker desteklemiyor.');
  }

  const vapidPublicKey = "BO9jlWMnM7RP4MeQWF9E8kph74Hwnl8ZepoLpvHSA7OhCq8Q9xLTX3vMnIWRXBw5WVGy2ufrqYcTIBkR5TQARdE";

  const timeInputs = [
    document.getElementById('time1'),
    document.getElementById('time2'),
    document.getElementById('time3'),
  ];
  const saveBtn = document.getElementById('saveBtn');
  const messageDiv = document.getElementById('message');

  async function requestPermissionAndGetToken() {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') throw new Error('Bildirim izni reddedildi.');

      const currentToken = await messaging.getToken({ vapidKey: vapidPublicKey });
      if (!currentToken) throw new Error('Token alınamadı.');

      console.log('FCM Token:', currentToken);
      messageDiv.textContent = "Bildirim izni verildi 💌";

      await db.ref('usersTokens/' + currentToken).set(true);
      return currentToken;
    } catch (error) {
      messageDiv.textContent = `Hata: ${error.message}`;
      throw error;
    }
  }

  saveBtn.onclick = async () => {
    try {
      const reminders = timeInputs
        .map(input => input.value.trim())
        .filter(time => time !== '');

      if (reminders.length === 0) {
        alert('Lütfen en az bir ilaç zamanı seçin!');
        return;
      }

      await requestPermissionAndGetToken();

      await db.ref('reminders').set(reminders);

      messageDiv.textContent = 'İlaç hatırlatıcılar ayarlandı!';
      console.log('Hatırlatmalar kaydedildi:', reminders);
    } catch (error) {
      console.error('Kaydetme hatası:', error);
    }
  };
});
