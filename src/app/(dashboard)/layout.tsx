interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="h-full flex items-center justify-center">{children}</div>
  );
};

export default DashboardLayout;
