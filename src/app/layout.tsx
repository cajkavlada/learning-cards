import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import { Navbar } from "./_components/navbar";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui";

export const metadata: Metadata = {
  title: "Learning cards",
  description: "simple learning app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <Navbar />
          <main className="flex flex-col items-center justify-center">
            {children}
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
