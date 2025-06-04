import { useEffect, useState } from "react";
import { requestPermission, onMessage, messaging, getFirebaseToken } from "../api/firebase";
import axiosInstance from "../api/axiosInstance";

function PushNotificationsProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<any[]>([]);

    useEffect(() => {

        (async () => {
            const permissionGranted = await requestPermission();
            if (permissionGranted) {
                const token = await getFirebaseToken();
                if (token) {
                    axiosInstance.post('/client/users/fcm-token', {
                        fcm_token: token
                    });
                }
            }
        })();

        onMessage(messaging, (payload) => {
            const id = Date.now();
            setToasts([
                {
                    id: id,
                    title: payload.notification?.title,
                    body: payload.notification?.body,
                    icon: payload.notification?.icon || '/icon.png',
                    image: payload.notification?.image || 'https://eu2.contabostorage.com/01e685ba2c5349d88a5776a0710094f3:efood-iek/112/01JQPGPNP4JNZW680MWYM564H2.jpg'
                },
                ...toasts
            ]);

            setTimeout(() => {
                setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
            }, 5000);
        });
    }, []);

    return (
        <>
            <div className="toast toast-top toast-end z-50">
                {toasts.map((toast) => (
                    <div key={toast.id} className="bg-base-100 flex flex-col max-w-70 shadow-lg rounded-2xl p-4 mb-4">
                        <div className="flex">
                            <div className="avatar">
                                <div className="mask mask-squircle w-8">
                                    <img src={toast.icon} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="font-bold">{toast.title}</div>
                                <div className="text-sm">{toast.body}</div>
                            </div>
                        </div>
                        {toast.image && <img src={toast.image} className="w-full mt-4 rounded-2xl" />}
                    </div>
                ))}
            </div>

            {children}
        </>
    );
}

export default PushNotificationsProvider