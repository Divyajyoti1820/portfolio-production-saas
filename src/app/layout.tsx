import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/providers/providers";
import { JotaiProvider } from "@/components/providers/jotai-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Modals } from "@/components/modals";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Productivity | Software-as-a-Service",
  description:
    "A Productivity board is a physical or digital project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency(or flow).",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={font.className}>
          <JotaiProvider>
            <Providers>
              <Modals />
              <Toaster />
              {children}
            </Providers>
          </JotaiProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
