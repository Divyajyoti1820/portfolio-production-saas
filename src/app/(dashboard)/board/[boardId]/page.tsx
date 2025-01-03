import { ProtectServer } from "@/features/auth/utils";
import { BoardIdClient } from "./client";

const BoardIdPage = async () => {
  await ProtectServer();

  return <BoardIdClient />;
};

export default BoardIdPage;
