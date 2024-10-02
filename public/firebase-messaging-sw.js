// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBbJRnC9NOpFpLNL3bcLoW7hbgLKUMBp_g",
    authDomain: "ifarm-17b22.firebaseapp.com",
    projectId: "ifarm-17b22",
    storageBucket: "ifarm-17b22.appspot.com",
    messagingSenderId: "353197689782",
    appId: "1:353197689782:web:101ed7dda069da0eb34f17",
    measurementId: "G-DQTF8LZQJC"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
