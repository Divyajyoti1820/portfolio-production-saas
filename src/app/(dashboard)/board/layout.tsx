import { Sidebar } from "./_components/sidebar";

interface Props {
  children: React.ReactNode;
}

const BoardLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="h-full">{children}</main>
    </div>
  );
};

export default BoardLayout;
