// Firebase config (kendi bilgilerinle değiştir)
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

const timeInputs = [
  document.getElementById('time1'),
  document.getElementById('time2'),
  document.getElementById('time3'),
];
const saveBtn = document.getElementById('saveBtn');
const messageDiv = document.getElementById('message');

let reminders = [];

// Notification izin ve Service Worker kaydı
function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Tarayıcınız bildirimleri desteklemiyor!');
    return;
  }
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      messageDiv.textContent = 'Bildirim izni verildi 💌';
      registerServiceWorker();
    } else {
      alert('Bildirim izni gereklidir!');
    }
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(reg => {
      console.log('Service Worker kayıt başarılı:', reg);
    }).catch(err => {
      console.error('Service Worker kayıt hatası:', err);
    });
  }
}

saveBtn.onclick = () => {
  reminders = timeInputs
    .map(input => input.value)
    .filter(time => time !== '');

  if (reminders.length === 0) {
    alert('En az bir ilaç zamanı seçmelisin!');
    return;
  }

  requestNotificationPermission();

  db.ref('reminders').set(reminders)
    .then(() => {
      messageDiv.textContent = 'İlaç hatırlatıcılar ayarlandı!';
      console.log('Hatırlatıcılar kaydedildi:', reminders);
    })
    .catch(err => {
      console.error('Firebase kaydetme hatası:', err);
    });
};

// Her dakika kontrol (sayfa açıkken)
setInterval(() => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0,5);

  db.ref('reminders').once('value').then(snapshot => {
    const times = snapshot.val() || [];
    times.forEach(time => {
      if (time === currentTime) {
        notify(`İlaç Vakti`, `İlaç vaktin geldi güzelim 💖`);

        // 30 dk sonra takip bildirimi
        setTimeout(() => {
          notify(`Hatırlatma`, `İlaçlarını aldın mı güzelim? ❤️`);
        }, 30 * 60 * 1000);
      }
    });
  });
}, 60000);

// Bildirim gösterme fonksiyonu
function notify(title, body) {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification(title, {
        body,
        vibrate: [300, 100, 300],
        icon: 'https://cdn-icons-png.flaticon.com/512/1037/1037916.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/1037/1037916.png',
        requireInteraction: true
      });
    });
  }
}

// Service Worker mesajları dinle
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.type === 'confirm') {
      messageDiv.textContent = "Seni seviyorum güzelim ❤️";
      setTimeout(() => { messageDiv.textContent = ""; }, 5000);
    }
  });
}
