import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import QueryProvider from "@/components/providers/query-provider";
import { ModalsProvider } from "@/components/providers/modals-providers";
import { JotaiProvider } from "@/components/providers/jotai-provider";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Productivity | Software-as-a-Service",
  description:
    "Productivity is a visual work management system that uses colored cards and boards to help teams manage projects and workflows",
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
          <NuqsAdapter>
            <QueryProvider>
              <JotaiProvider>
                <ModalsProvider />
                <Toaster />
                {children}
              </JotaiProvider>
            </QueryProvider>
          </NuqsAdapter>
        </body>
      </html>
    </SessionProvider>
  );
}
