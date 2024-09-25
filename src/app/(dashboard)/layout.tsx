import { Protection } from "@/features/auth/util";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  await Protection();
  return <div className="h-full">{children}</div>;
};

export default DashboardLayout;
