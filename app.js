// Firebase ayarların
const firebaseConfig = {
  apiKey: "AIzaSyBXXXCLGe70id54wlMhUtHQHOJe8l4a6wA",
  authDomain: "live-chat-9d81c.firebaseapp.com",
  projectId: "live-chat-9d81c",
  messagingSenderId: "253242248304",
  appId: "1:253242248304:web:3e440995fe27bc8e2fb8b5"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

document.getElementById("addBtn").addEventListener("click", () => {
  const time = document.getElementById("timeInput").value;
  if (!time) return alert("Lütfen bir saat seç 💖");

  const li = document.createElement("li");
  li.textContent = `⏰ ${time} - Hatırlatma Ayarlandı`;
  document.getElementById("reminderList").appendChild(li);

  const now = new Date();
  const [hour, minute] = time.split(":");
  const reminderTime = new Date();
  reminderTime.setHours(hour, minute, 0, 0);

  let delay = reminderTime.getTime() - now.getTime();
  if (delay < 0) delay += 24 * 60 * 60 * 1000;

  // Hatırlatma bildirimi
  setTimeout(() => {
    sendNotification("💊 İlaç zamanı 💖", "Canım, ilacını alma vakti geldi!");
    navigator.vibrate([300, 100, 300]);

    // 30 dakika sonra "aldın mı" sorusu
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

Notification.requestPermission();
      
