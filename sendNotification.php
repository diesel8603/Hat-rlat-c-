<?php
// Firebase Sunucu Anahtarın (Server key) — Firebase Console > Project Settings > Cloud Messaging sekmesinde bulabilirsin
$serverKey = "FIREBASE_SERVER_KEYİNİ_BURAYA_YAZ";

// Kullanıcının tarayıcı token’i (ön tarafta alınıp veritabanına kaydedilecek)
$deviceToken = "KULLANICI_TOKENİ_BURAYA_GELECEK";

// Bildirim içeriği
$title = "Hatırlatma Zamanı";
$body = "İlaç saatin geldi güzelim 💊";

// Firebase API URL
$url = "https://fcm.googleapis.com/fcm/send";

// Gönderilecek veri
$fields = [
    "to" => $deviceToken,
    "notification" => [
        "title" => $title,
        "body" => $body,
        "icon" => "https://seninsiten.com/icon.png",
        "click_action" => "https://seninsiten.com"
    ]
];

// HTTP başlıkları
$headers = [
    "Authorization: key=$serverKey",
    "Content-Type: application/json"
];

// CURL isteği
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
$result = curl_exec($ch);
if ($result === FALSE) {
    die("Curl Hatası: " . curl_error($ch));
}
curl_close($ch);

echo "Bildirim gönderildi: " . $result;
?>
