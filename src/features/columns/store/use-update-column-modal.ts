import { useQueryState, parseAsBoolean } from "nuqs";

export const useUpdateColumnModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "update-column",
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
