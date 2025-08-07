self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'confirm') {
    event.waitUntil(
      clients.matchAll({type: 'window'}).then(windowClients => {
        for (const client of windowClients) {
          client.postMessage({type: 'confirm'});
          client.focus();
          return;
        }
        clients.openWindow('/');
      })
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
