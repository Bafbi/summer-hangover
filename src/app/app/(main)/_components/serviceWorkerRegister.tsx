"use client";
import { useEffect } from "react";

export function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function (registration) {
          console.log("Service Worker Registered", registration);
        })
        .catch(function (error) {
          console.log("Service Worker Registration failed", error);
        });
    }
  }, []);

  const requestPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
      } else {
        console.log("Notification permission not granted.");
      }
    } catch (error) {
      console.error("Error getting notification permission", error);
    }
  };

  useEffect(() => {
    const request = async () => {
      await requestPermission();
    };
    request();
  }, []);

  return null;
}
