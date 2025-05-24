import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { LocationForm } from "./locationForm";
import { Locations } from "./location";

export const LocationDialog = ({
  value,
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  value: Locations | undefined;
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
          <DialogDescription>
            Add a new destination to your journey
          </DialogDescription>
        </DialogHeader>
        <LocationForm value={value} dialogHandle={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};
