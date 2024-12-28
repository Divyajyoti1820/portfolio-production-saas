import { useQueryState, parseAsBoolean } from "nuqs";

export const useUpdateTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "update-task",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
