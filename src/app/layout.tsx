import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import SessionWrapper from "./_components/session_wrapper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NotifWrapper from "./app/(main)/_components/notifWrapper";

export const metadata = {
  title: "Summer-Hangover",
  description: "An application to help you plan your summer hangover",
  icons: [{ rel: "icon", url: "/summer-hangover-icon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </head>

      <body className="bg-surface">
        <SessionWrapper>
          <TRPCReactProvider>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              limit={1}
              theme="light"
              style={{ marginTop: "5rem"}}
              toastStyle={{ 
                backgroundColor: "#F9EBE1", marginLeft: "1rem", marginRight: "1rem",
                borderRadius: "0.5rem", color: "#524437", fontFamily: "var(--font-geist-sans)"
              }}
            />
            <NotifWrapper />
              {children}
          </TRPCReactProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
