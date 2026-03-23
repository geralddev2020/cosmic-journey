import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlidersHorizontalIcon } from "@/components/ui/sliders-horizontal";
import APODDateRangeForm from "@/features/apod/components/APODDateRangeForm";
import { useUIStore } from "@/store/useUIStore";

const DIALOG_TEXT = {
  TITLE: `Journey Through Time`,
  DESCRIPTION: `Travel back to explore the cosmos as it was revealed on specific days. Pick a range to uncover past wonders.`,
};

export default function APODDialogDateRange() {
  const setDialogOpen = useUIStore((state) => state.setDialogOpen);
  const isDialogOpen = useUIStore((state) => state.isDialogOpen);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <SlidersHorizontalIcon />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{DIALOG_TEXT.TITLE}</DialogTitle>
          <DialogDescription>{DIALOG_TEXT.DESCRIPTION}</DialogDescription>
        </DialogHeader>

        <APODDateRangeForm />
      </DialogContent>
    </Dialog>
  );
}
