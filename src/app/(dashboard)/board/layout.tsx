import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

interface Props {
  children: React.ReactNode;
}

const BoardLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="h-full flex-1 w-[calc(100vw-225px)]">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default BoardLayout;
