import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";
import SessionWrapper from "./_components/session_wrapper";

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
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
