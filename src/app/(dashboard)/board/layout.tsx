import { Sidebar } from "./_components/sidebar";

interface Props {
  children: React.ReactNode;
}

const BoardLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="">{children}</main>
    </div>
  );
};

export default BoardLayout;
