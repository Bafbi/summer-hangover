import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import SessionWrapper from "./_components/session_wrapper";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "~/app/api/uploadthing/core";
import { APILoader } from "@googlemaps/extended-component-library/react";
import { env } from "~/env";
import { GoogleMapsAPILoader } from "./_components/googlemaps-api-loader";

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
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />
            <GoogleMapsAPILoader />
            {children}
          </TRPCReactProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
