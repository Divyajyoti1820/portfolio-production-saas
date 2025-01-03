import { ProtectServer } from "@/features/auth/utils";
import { CreateClient } from "./client";

const BoardCreatePage = async () => {
  await ProtectServer();

  return <CreateClient />;
};

export default BoardCreatePage;
