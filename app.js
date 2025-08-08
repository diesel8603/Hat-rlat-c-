AOS.init();

const form = document.getElementById('reminderForm');
const status = document.getElementById('status');
const reminderSound = document.getElementById('reminderSound');

let reminderTimeout1 = null;
let reminderTimeout2 = null;

// Sabit isim burada global olarak tanımlandı
const loverName = 'Güzelim';

function showNotification(title, body) {
  if (Notification.permission === 'granted') {
    const options = {
      body,
      vibrate: [200, 100, 200],
      icon: 'icon.png',
    };
    new Notification(title, options);
  }
}

function playSound() {
  reminderSound.currentTime = 0;
  reminderSound.play();
}

function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200]);
  }
}

function scheduleReminder(timeStr) {
  const now = new Date();
  const [hour, minute] = timeStr.split(':').map(Number);
  let reminderDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);

  if (reminderDate < now) {
    reminderDate.setDate(reminderDate.getDate() + 1); // Ertesi gün
  }

  const diffMs = reminderDate.getTime() - now.getTime();

  // İlk bildirim
  reminderTimeout1 = setTimeout(() => {
    const title = 'İlaç Vakti Geldi Güzelimm ❤️';
    const body = `${loverName}, güzelim ilaç vakti geldi! Unutma ❤️`;
    showNotification(title, body);
    playSound();
    vibrate();
    status.textContent = 'İlk hatırlatma yapıldı.';

    // 30 dakika sonra ikinci hatırlatma
    reminderTimeout2 = setTimeout(() => {
      const title2 = 'İlaç Hatırlatma 🌹';
      const body2 = `${loverName}, ilacını aldın mı prensesimm?`;
      showNotification(title2, body2);
      playSound();
      vibrate();
      status.textContent = 'İkinci hatırlatma yapıldı.';
    }, 1000 * 60 * 30);

  }, diffMs);

  status.textContent = `Hatırlatma ${reminderDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} için ayarlandı.`;
}

function requestPermission() {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission !== 'granted') {
          alert('Bildirim izni vermen gerekiyor.');
        }
      });
    }
  } else {
    alert('Tarayıcınız bildirimleri desteklemiyor.');
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const reminderTime = form.reminderTime.value;

  if (!reminderTime) {
    alert('Lütfen saat seç Bitanem.');
    return;
  }

  requestPermission();

  // Önceki hatırlatıcıları temizle
  if (reminderTimeout1) clearTimeout(reminderTimeout1);
  if (reminderTimeout2) clearTimeout(reminderTimeout2);

  // Hatırlatıcıyı zamanla
  scheduleReminder(reminderTime);

  status.textContent = `Hatırlatıcı kaydedildi, ${loverName}!`;
});
