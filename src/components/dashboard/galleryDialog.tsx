import { Photo } from "./gallery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { GalleryForm } from "./galleryForm";

export const GalleryDialog = ({
  value,
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  value: Photo | undefined;
}) => {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Photo</DialogTitle>
          <DialogDescription>
            Upload a new photo to your travel gallery
          </DialogDescription>
        </DialogHeader>
        <GalleryForm value={value} dialogHandle={setIsDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};
