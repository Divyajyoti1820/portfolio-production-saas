interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return <main className="h-full w-full">{children}</main>;
};

export default DashboardLayout;
