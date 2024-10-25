import { ProtectServer } from "@/features/auth/utils";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  await ProtectServer();
  return <main className="h-full w-full">{children}</main>;
};

export default DashboardLayout;
