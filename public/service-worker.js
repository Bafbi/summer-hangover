// @ts-nocheck
// @ts-espect-error
self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/summer-hangover-icon.png",
      badge: "/path/to/badge.png",
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.log("Push event but no data");
  }
});
