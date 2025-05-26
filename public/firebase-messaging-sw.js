importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDdEKSBxFEq81Oh2LB1Z1i8iYUpPABGJPo",
    authDomain: "efood-d3fff.firebaseapp.com",
    projectId: "efood-d3fff",
    storageBucket: "efood-d3fff.firebasestorage.app",
    messagingSenderId: "951379823744",
    appId: "1:951379823744:web:b5aa4319871bcb74042a65"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});