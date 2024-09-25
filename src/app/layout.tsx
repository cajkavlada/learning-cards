import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

import { Navbar } from "../components/layout/navbar";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui";
import { TooltipProvider } from "~/components/ui/tooltip";

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
      <TooltipProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body className="flex h-screen flex-col">
            <nav className="flex h-16 w-full items-center p-4">
              <Navbar />
            </nav>
            <main className="flex flex-1 flex-col items-center overflow-auto bg-gray-100">
              {children}
            </main>
            {modal}
            <Toaster />
          </body>
        </html>
      </TooltipProvider>
    </ClerkProvider>
  );
}
