interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-full flex items-center justify-center">
      <main className="md:h-auto md:w-[420px]">{children}</main>
    </div>
  );
};

export default AuthLayout;
