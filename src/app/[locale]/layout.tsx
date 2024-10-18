import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";
import { NextIntlClientProvider } from "next-intl";
import { Navbar } from "../../components/layout/navbar";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui";
import { TooltipProvider } from "~/components/ui/tooltip";
import { DialogProvider } from "~/components/layout/dialog/dialogProvider";
import { getMessages } from "next-intl/server";
import { clerkLocalizations, type Locale } from "~/utils/clerkLocalizations";
import { CSPostHogProvider } from "~/components/providers/PostHogProvider";
import { ThemeProvider } from "~/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Learning cards",
  description: "simple learning app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const messages = await getMessages();
  const clerkLocalization = clerkLocalizations[locale] || clerkLocalizations.en;

  return (
    <ClerkProvider localization={clerkLocalization}>
      <CSPostHogProvider>
        <NextIntlClientProvider messages={messages}>
          <html
            lang={locale}
            className={`${GeistSans.variable}`}
            suppressHydrationWarning
          >
            <body className="flex h-screen flex-col">
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <TooltipProvider>
                  <DialogProvider>
                    <nav className="flex h-16 w-full items-center p-4">
                      <Navbar />
                    </nav>
                    <main className="flex-1 overflow-auto">{children}</main>
                    <Toaster />
                  </DialogProvider>
                </TooltipProvider>
              </ThemeProvider>
            </body>
          </html>
        </NextIntlClientProvider>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
