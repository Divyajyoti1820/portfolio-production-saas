interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return <main className="max-h-screen max-w-screen-2xl">{children}</main>;
};

export default DashboardLayout;
