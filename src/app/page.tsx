import { ProtectServer } from "@/features/auth/utils";

const Home = async () => {
  await ProtectServer();

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-2">
      <h1 className="text-6xl font-bold">Productivity</h1>
      <p className="text-lg font-semibold text-muted-foreground">
        Software-as-a-Service
      </p>
      <p className="text-[10px]"></p>
    </div>
  );
};

export default Home;
