import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Function to request the Firebase token
export const requestFirebaseToken = async () => {
  try {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      
      const currentToken = await getToken(messaging, { 
        serviceWorkerRegistration: registration, 
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY 
      });
      
      if (currentToken) {
        console.log('Firebase token:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available.');
        return null;
      }
    } else {
      console.error('Service workers are not supported in this browser.');
      return null;
    }
  } catch (error) {
    console.error('Error while retrieving token:', error);
    return null;
  }
};

// Listen for messages while the app is in the foreground
export const listenForMessages = (showNotification: (message: string) => void) => {
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);

    // Show notification using the NotificationContext
    if (payload.notification) {
      const { title, body } = payload.notification;
      const message = `${title}: ${body}`;
      showNotification(message);
    }
  });
};
