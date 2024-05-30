  "use client";
  import React, { useEffect, useState } from "react";
  import MainMenuFooter from "~/app/_components/mainMenuFooter";
  import Head from "next/head";
  import MainMenuHeader from "~/app/_components/mainMenuHeader";
  import Link from "next/link";
  import { useSession } from 'next-auth/react';
  import { api } from "~/trpc/react";
  import Pusher from "pusher-js";
import { env } from "~/env";

  const notifTest = [
    {
      date: "Aujourd'hui",
      items: [
        {
          id: 1,
          text: "Paul vous a invité à rejoindre son groupe",
          groupName: "Nom du groupe",
          link: "#",
        },
        {
          id: 2,
          text: "Nathan a ajouté une nouvelle activité à l'évènement",
          eventName: "Nom de l'évènement",
          link: "#",
        },
      ],
    },
    {
      date: "Hier",
      items: [
        {
          id: 3,
          text: "Julien a ajouté un nouvel évènement au groupe",
          groupName: "Nom du groupe",
          link: "#",
        },
      ],
    },
    {
      date: "Mardi 07/06/2024",
      items: [],
    },
  ];

  export default function Notifications() {
    
    const { data: session } = useSession();
    const [notifications, setNotifications] = useState<any[]>([]);
    const getNotifications = api.notification.getNotifications.useQuery();
    const sendNotification = api.notification.sendNotification.useMutation();

    useEffect(() => {
      if (getNotifications.data) {
        setNotifications(getNotifications.data);
      }
    }, [getNotifications.data]);

    useEffect(() => {
      if (!session) return;

      const userId = session.user.id;

      // Initialize Pusher
      const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || '',
        authEndpoint: '/api/pusher/auth',
      });

      // Abonnez-vous à un canal privé pour l'utilisateur actuel
      const channel = pusher.subscribe(`private-user-${userId}`);

      channel.bind('new-notification', (data: { message: any; }) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          data.message,
        ]);
      });

      return () => {
        pusher.unsubscribe(`private-user-${userId}`);
      };
    }, [session]);

    const handleSendNotification = async () => {
      if (!session) return;
      const message = "Ceci est un test de notification";
      await sendNotification.mutateAsync({ message });
    };

    return (
      <div className="bg-surface flex h-screen flex-col">
        <MainMenuHeader />

        {/* Contenu de la page notif */}
        <main className="bg-surface mt-12 flex-grow overflow-y-auto overflow-x-hidden px-2 py-4">

          {/* Titre de la section notif + bouton retour et marqué comme lu */}
          <div className="bg-surface-variant mb-4 mt-6 flex h-14 flex-col items-center rounded-md">
            <h1 className="pt-2 text-4xl font-semibold">Notifications</h1>
          </div>
          <div className="mb-8 ml-52 mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <button className="mr-3 rounded-md bg-inverse-primary px-5 py-1 text-sm font-semibold text-inverse-surface">
                <span>
                  Marquer
                  <br />
                  comme lu
                </span>
              </button>
              <Link
                href="/app"
                className="rounded-full bg-inverse-primary p-2 font-bold"
              >
                <span style={{ fontSize: 40 }} className="material-icons">
                  close
                </span>
              </Link>
            </div>
          </div>

          {/* Section des notifications */}
          {/* TODO : Faire le front des notif + séparation selon leurs dates (auj, hier, antèrieur)*/}
          {notifications.map((notification, index) => (
            <div key={index} className="notification-item">
              {notification.message}
            </div>
          ))}
        </main>
      </div>
    );
  };




  /* 
    useEffect(() => {
      const userId = session?.user?.id;

      // Permet de se connecter au service Pusher, avec nos informations d'identification
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY ?? "", {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? "",
        authEndpoint: "/api/pusher/auth", // Pour l'authentification privée
      });

      // On s'abonne au canal privé de l'utilisateur :
      const channel = pusher.subscribe(`private-user-${userId}`); // Remplacez par l'ID utilisateur dynamique

      // Permet de lier une fonction de rappel à un événement spécifique sur le canal.
      // On écoute l'événement 'new-notification' sur le canal. lorsque l'événement est
      // reçu, on applique setNotification qui ajoute la notification à la liste des notifications
      channel.bind("new-notification", 
        (data: { message: any }) => {
          setNotifications((prevNotifications) => [
            // Produit un nouveau tableau en concaténant les notifications 
            // précédentes avec la nouvelle notification
            ...prevNotifications,
            data.message,
          ]);
      });

      return () => {
        pusher.unsubscribe(`private-user-${userId}`);
      };
    }, [session]);
  */