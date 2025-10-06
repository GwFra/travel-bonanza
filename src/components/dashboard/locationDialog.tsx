import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { LocationForm } from "./locationForm";
import { Locations } from "./location";

export const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
  const file: File | null | undefined = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (event) => {
    const fileData = event.target?.result;
    if (fileData) {
      // Fetch presigned URL and save reference in Postgres (powered by Neon)
      const presignedURL = new URL("/api/presigned", window.location.href);
      presignedURL.searchParams.set("fileName", file.name);
      presignedURL.searchParams.set("contentType", file.type);
      fetch(presignedURL.toString())
        .then((res) => res.json())
        .then((res) => {
          const body = new Blob([fileData], { type: file.type });
          fetch(res.signedUrl, {
            body,
            method: "PUT",
          })
            .then(() => {
              // Save reference to the object in Postgres (powered by Neon)
              fetch("/api/user/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  objectUrl: res.signedUrl.split("?")[0],
                }),
              });
            })
            .catch(console.log);
        });
    }
  };
  reader.readAsArrayBuffer(file);
};

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
