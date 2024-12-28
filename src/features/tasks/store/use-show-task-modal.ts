import { useQueryState, parseAsBoolean } from "nuqs";

export const useShowTaskModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "show-task",
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
