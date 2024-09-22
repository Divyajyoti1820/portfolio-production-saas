import { auth } from "@/auth";

const HomePage = async () => {
  const session = await auth();
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className="text-5xl font-bold">
        Productivity | Software-as-a-Service
      </h1>
      <p className="text-xs">{JSON.stringify(session)}</p>
    </div>
  );
};

export default HomePage;
