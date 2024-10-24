interface Props {
  children: React.ReactNode;
}

const BoardPageLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <main className="h-full flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default BoardPageLayout;
