import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "./_components/main-sidebar";

interface Props {
  children: React.ReactNode;
}

const BoardPageLayout = ({ children }: Props) => {
  return (
    <SidebarProvider className="h-full">
      <MainSidebar />
      <main className="h-full w-full flex items-center justify-center">
        {children}
      </main>
    </SidebarProvider>
  );
};

export default BoardPageLayout;
