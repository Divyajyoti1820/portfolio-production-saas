interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-full flex flex-row items-center justify-evenly">
      {children}
    </div>
  );
};

export default AuthLayout;
