console.log("app.js yüklendi");
const addBtn = document.getElementById("addBtn");
console.log("addBtn:", addBtn);

addBtn.addEventListener("click", () => console.log("Butona basıldı"));


// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBXXXCLGe70id54wlMhUtHQHOJe8l4a6wA",
  authDomain: "live-chat-9d81c.firebaseapp.com",
  projectId: "live-chat-9d81c",
  messagingSenderId: "253242248304",
  appId: "1:253242248304:web:3e440995fe27bc8e2fb8b5"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const addBtn = document.getElementById("addBtn");
const timeInput = document.getElementById("timeInput");
const reminderList = document.getElementById("reminderList");

Notification.requestPermission().then(permission => {
  if (permission !== "granted") {
    alert("Bildirim izni verilmedi, hatırlatmalar çalışmayabilir.");
  }
});

addBtn.addEventListener("click", (event) => {
  event.preventDefault(); // form varsa sayfa yenilenmesini engelle

  const time = timeInput.value;
  if (!time) {
    alert("Lütfen bir saat seç 💖");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `⏰ ${time} - Hatırlatma Ayarlandı`;
  reminderList.appendChild(li);

  const now = new Date();
  const [hour, minute] = time.split(":").map(Number);
  const reminderTime = new Date();
  reminderTime.setHours(hour, minute, 0, 0);

  let delay = reminderTime.getTime() - now.getTime();
  if (delay < 0) delay += 24 * 60 * 60 * 1000;

  setTimeout(() => {
    sendNotification("💊 İlaç zamanı 💖", "Canım, ilacını alma vakti geldi!");
    if (navigator.vibrate) navigator.vibrate([300, 100, 300]);

    setTimeout(() => {
      sendConfirmNotification();
    }, 30 * 60 * 1000);

  }, delay);
});

function sendNotification(title, body) {
  if (Notification.permission === "granted") {
    new Notification(title, { body, icon: "icon.png" });
  }
}

function sendConfirmNotification() {
  if (Notification.permission === "granted") {
    const n = new Notification("💌 İlaçlarını aldın mı güzelim?", {
      body: "Evet 💖 butonuna tıkla",
      icon: "icon.png"
    });
    n.onclick = () => {
      new Notification("💖 Seni seviyorum 💖", { icon: "icon.png" });
    };
  }
}

