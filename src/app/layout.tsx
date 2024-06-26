import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TRPCReactProvider } from "~/trpc/react";
import SessionWrapper from "~/app/_components/session_wrapper";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "~/app/api/uploadthing/core";
import { ServiceWorkerRegister } from "./app/(main)/_components/serviceWorkerRegister";
// import { GoogleMapsAPILoader } from "./_components/googlemaps-api-loader";

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
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body className="bg-surface">
        <ServiceWorkerRegister />
        <SessionWrapper>
          <TRPCReactProvider>
            <ToastContainer
              position="top-center"
              autoClose={6500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              draggablePercent={45}
              pauseOnHover
              limit={1}
              theme="light"
              style={{ marginTop: "5rem" }}
              toastStyle={{
                backgroundColor: "#DDE5D8",
                marginLeft: "1rem",
                marginRight: "1rem",
                borderRadius: "0.5rem",
                color: "#524437",
                fontFamily: "var(--font-geist-sans)",
              }}
            />
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            {/* <GoogleMapsAPILoader /> */}
            {children}
          </TRPCReactProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
