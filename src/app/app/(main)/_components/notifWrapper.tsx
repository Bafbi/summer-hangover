"use client";
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { env } from "~/env";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import Link from 'next/link';


const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
    cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
});

export default function NotifWrapper() {
    const { data: session } = useSession();
    const [notifId, setNotifId] = useState(0);

    const { data: newNotification } = api.notification.getNotification.useQuery({ notifId: notifId });

    useEffect(() => {
        if (!session) return;

        const channel = pusher.subscribe(`notifications-${session.user.id}`);

        channel.bind("new-notification", async (data: { notifId: number }) => {
            setNotifId(data.notifId);
        });

        return () => {
            pusher.unsubscribe(`notifications-${session.user.id}`);
        };
    }, [session]);
    //`${newNotification.message}`
    useEffect(() => {
        if (newNotification) {
            setNotifId(0);
            toast.error(<ToastLink 
                url={newNotification.urlLink || 'error url type'} 
                message={newNotification.message || 'error message type'}
                />, {
                    position: "top-center",
                    autoClose: 6000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    closeButton: false,
                }
            );
        }
    }, [newNotification]);

    return null;
};

function ToastLink({ url, message}: { url: string, message: string }) {
    return (
        <Link href={url}>
            <span>{message}</span>
        </Link>
    );
}