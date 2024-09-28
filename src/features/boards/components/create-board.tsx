import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export const CreateBoard = () => {
  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader className="space-y-3">
          <DialogTitle>Create New Board</DialogTitle>
          <DialogDescription>
            Create your new board and add columns in which you want to separate
            your tasks.
            <strong className="text-white"> Max. 6 columns per board</strong>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline" size="sm">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
