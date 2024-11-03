import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export const CustomCheckbox = ({ checked, onChange }: Props) => {
  return (
    <div className="relative cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={cn(
          "w-5 h-5 bg-gray-200 border-2 rounded border-primary",
          checked ? "bg-primary" : "bg-white"
        )}
      />
      {checked && <CheckIcon className="absolute inset-0 size-4 text-white" />}
    </div>
  );
};
