import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import { Navbar } from "../components/layout/navbar";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui";

export const metadata: Metadata = {
  title: "Learning cards",
  description: "simple learning app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <nav className="flex h-16 w-full items-center p-4">
            <Navbar />
          </nav>
          <main className="flex flex-col items-center justify-center">
            {children}
          </main>
          {modal}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
