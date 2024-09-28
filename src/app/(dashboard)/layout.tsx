import { Protection } from "@/features/auth/util";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  /* Auth Protection */
  await Protection();
  /* Auth Protection */

  return (
    <div className="h-full flex">
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
