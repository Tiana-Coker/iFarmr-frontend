// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: 'AIzaSyDGgOmVsNeoCk8JGx9g1zKrR3wdzV6B9NU',
    authDomain: 'ifarmr-ff5d0.firebaseapp.com',
    projectId: 'ifarmr-ff5d0',
    storageBucket: 'ifarmr-ff5d0.appspot.com',
    messagingSenderId: '1085541548184',
    appId: '1:1085541548184:web:96eded14c8303544bf10ed',
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
