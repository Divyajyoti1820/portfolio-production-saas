"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "./_components/main-sidebar";

interface Props {
  children: React.ReactNode;
}

const BoardPageLayout = ({ children }: Props) => {
  return (
    <SidebarProvider className="max-h-screen">
      <MainSidebar />
      <main className="max-h-screen w-full flex items-center justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default BoardPageLayout;
