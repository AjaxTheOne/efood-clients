import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
export { onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDdEKSBxFEq81Oh2LB1Z1i8iYUpPABGJPo",
    authDomain: "efood-d3fff.firebaseapp.com",
    projectId: "efood-d3fff",
    storageBucket: "efood-d3fff.firebasestorage.app",
    messagingSenderId: "951379823744",
    appId: "1:951379823744:web:b5aa4319871bcb74042a65"
};

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);


export async function requestPermission() {
    try {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    } catch (error) {
        return false;
    }
}

export async function getFirebaseToken() {
     try {
        const token = await getToken(messaging, {
            vapidKey: 'BBisyBpUowRx5OPCzuns6d_hyUKMn2W-lBbQcDz3pH6vDXG9ClX1pWwBqr5bAMRmEt53oJF0MhwZG49WTbEDLJk'
        });
        return token || null;
    } catch (error) {
        return null;
    }
}
