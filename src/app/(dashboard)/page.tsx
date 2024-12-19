import { ProtectServer } from "@/features/auth/utils";
import DashboardClient from "./client";

const DashboardPage = async () => {
  await ProtectServer();

  return <DashboardClient />;
};

export default DashboardPage;
