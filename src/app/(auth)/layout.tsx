import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-full flex flex-row items-center justify-evenly">
      <Image
        src="/logo.svg"
        alt="Productivity | Saas"
        width={180}
        height={60}
        className="hidden lg:flex"
      />
      <main className="md:h-auto md:w-[420px]">{children}</main>
      <Image
        src="/logo.svg"
        alt="Productivity | Saas"
        width={180}
        height={60}
        className="hidden lg:flex"
      />
    </div>
  );
};

export default AuthLayout;
