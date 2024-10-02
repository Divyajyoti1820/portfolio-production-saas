import { Logo } from "./logo";

type Props = {
  open: boolean;
};

export const SidebarHeader = ({ open }: Props) => {
  return (
    <div className="mb-3 pb-3 border-b border-muted-foreground">
      <div className="flex cursor-pointer items-center justify-center rounded-md transition-colors hover :bg-slate-100">
        <div className="flex items-center justify-center gap-2 ">
          <Logo />
          {open && (
            <div className="flex flex-col items-start justify-center">
              <span className="block text-md text-white font-semibold">
                Productivity
              </span>
              <span className="block text-xs text-muted-foreground">
                Software-as-a-Service
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
