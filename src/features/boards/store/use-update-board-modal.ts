import { useQueryState, parseAsBoolean } from "nuqs";

export const useUpdateBoardModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "update-board",
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
