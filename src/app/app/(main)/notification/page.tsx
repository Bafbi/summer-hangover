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
  import { format, isToday, isYesterday } from 'date-fns';

  interface Notification {
    id: number;
    userId: string;
    message: string;
    createdAt: string; 
  }

// Fonction qui permet de formater les notifications
  const formatNotifications = (notifications: any[]) => {
    // On formate les notifications pour les regrouper par date
    const formattedNotifs = notifications.reduce((accumulator, notification) => {

      // "date" désigne la date de la notification
      const date = new Date(notification.createdAt);


      // Test si la date est invalide
      if (isNaN(date.getTime())) {
        console.error('Invalid date:', notification.createdAt);
        return accumulator;
      }

      // On formate la date pour l'afficher en tant que chaine de caractères
      const formattedDate = isToday(date) ? "Aujourd'hui" : 
                            (isYesterday(date) ? 'Hier' : format(date, 'eeee dd/MM/yyyy'));
  
      // Si la date n'existe pas dans l'accumulateur, on la créer
      if (!accumulator[formattedDate]) {
        accumulator[formattedDate] = [];
      }

      // On ajoute la notification à la date correspondante
      accumulator[formattedDate].push(notification);
      return accumulator;
    }, {});
  
    console.log('SIMPLE_formattedNotifications:', formattedNotifs);
    console.log('ENTRIES_Object.entries(formattedNotifications):', Object.entries(formattedNotifs));
    // On tri les dates par ordre décroissant pour les afficher en commencant par la plus récente
    return Object.entries(formattedNotifs)
      .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
  };


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

      // Canal privé de l'utilisateur
      const channel = pusher.subscribe(`private-user-${userId}`);

      // Associe une fonction de rappel à l'event 'new-notification' sur le canal
      channel.bind('new-notification', (data: { message: any; }) => {
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          data.message,
        ]);
      });

      // Nettoyage et fin d'écoute du canal
      return () => {
        pusher.unsubscribe(`private-user-${userId}`);
      };
    }, [session]);

    const handleSendNotification = async () => {
      if (!session) return;
      const message = "Ceci est un test de notification";
      await sendNotification.mutateAsync({ message });
    };

    const formattedNotifications = formatNotifications(notifications);
    
    return (
      <div className="bg-surface flex h-screen flex-col">
        <MainMenuHeader />

        {/* Contenu de la page notif */}
        <main className="bg-surface mt-12 flex-grow overflow-y-auto overflow-x-hidden px-2 py-4">

          {/* Titre de la section notif + bouton retour et marqué comme lu */}
          <div className="bg-surface-variant mb-4 mt-6 flex h-14 flex-col items-center rounded-md">
            <h1 className="pt-2 text-4xl font-semibold">Notifications</h1>
          </div>
          <button onClick={handleSendNotification}>Envoyer une notification</button>
          <p>session.user.id = {session?.user.id}</p>
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
          {formattedNotifications.map(([date, items], index) => (
            <div key={index}>
              <h1>{date}</h1>
              {items.map((notification, idx) => (
                <div key={idx} className="notification-item">
                  {notification.message}
                </div>
              ))}
            </div>
          ))}

          /* TODO : le contenue de chaque notification de formattedNotifications de la manière suivante:
           Aujourd'hui :
           - NOM1 a ajouté un nouvel évènement au groupe (exemple)
           Hier :
           - NOM2 vous a invité à rejoindre son groupe (exemple)
           - NOM3 a ajouté une nouvelle activité à l'évènement (exemple)
           Mardi 07/06/2024 :
           - NOM4 a ajouté un nouvel évènement au groupe (exemple)*/
          
          
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