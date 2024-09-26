import { auth } from "@/auth";
import { UserButton } from "@/features/auth/components/user-button";

const Home = async () => {
  const session = await auth();

  return (
    <div className="h-full flex flex-col gap-y-2 items-center justify-center">
      <h1 className="text-6xl font-semibold">
        Productivity | Software-as-a-Service
      </h1>
      <p className="text-xs">{JSON.stringify(session)}</p>
      <UserButton />
    </div>
  );
};

export default Home;
