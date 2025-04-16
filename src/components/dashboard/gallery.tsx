"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  Plus,
  Pencil,
  Trash2,
  MapPin,
  ChevronDown,
  Search,
  CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GalleryDialog } from "./galleryDialog";

// Import the sample photo data - soon to come from somewhere else
import { gallery as initialPhotos } from "@/data/gallery";
export type Photo = (typeof initialPhotos)[0];

export default function GalleryManager() {
  const [photos, setPhotos] = useState(initialPhotos);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo>();
  const [sortOrder, setSortOrder] = useState("newest");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter photos based on search term
  const filteredPhotos = photos.filter(
    (photo) =>
      photo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort photos based on selected order
  const sortedPhotos = [...filteredPhotos].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (sortOrder === "newest") {
      return dateB.getTime() - dateA.getTime();
    } else if (sortOrder === "oldest") {
      return dateA.getTime() - dateB.getTime();
    } else if (sortOrder === "location") {
      return a.location.localeCompare(b.location);
    }
    return 0;
  });

  const handleAddPhoto = () => {
    setCurrentPhoto(undefined);
    setIsDialogOpen(true);
  };

  const handleEditPhoto = (photo: Photo) => {
    setCurrentPhoto(photo);
    setIsDialogOpen(true);
  };

  const handleDeletePhoto = (photo: Photo) => {
    setCurrentPhoto(photo);
    setIsDeleteDialogOpen(true);
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // In a real app, you would upload this to a server or cloud storage
  //     // For this demo, we'll just create a local URL
  //     const imageUrl = URL.createObjectURL(file);
  //     setPreviewImage(imageUrl);
  //     setFormData({ ...formData, image: imageUrl });
  //   }
  // };

  // const handleSavePhoto = (isNew = false) => {
  //   if (isNew) {
  //     // Add new photo
  //     setPhotos([...photos, formData]);
  //     setIsAddDialogOpen(false);
  //   } else {
  //     // Update existing photo
  //     setPhotos(
  //       photos.map((photo) => (photo.id === formData.id ? formData : photo))
  //     );
  //     setIsEditDialogOpen(false);
  //   }
  // };

  const handleConfirmDelete = () => {
    setPhotos(photos.filter((photo) => photo.id !== currentPhoto?.id));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search photos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="location">By Location</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleAddPhoto} className="whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Add Photo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedPhotos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={`/gallery/${photo.image}` || "/placeholder.svg"}
                alt={photo.description}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEditPhoto(photo)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeletePhoto(photo)}
                      className="text-red-500 focus:text-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-4">
              <div>
                <h3 className="font-medium text-sm mb-1 line-clamp-1">
                  {photo.description}
                </h3>
                <div className="flex justify-between items-start text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{photo.location}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    <span>{format(new Date(photo.date), "MMM d, yyyy")}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedPhotos.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            {searchTerm ? "No photos match your search" : "No photos added yet"}
          </p>
        </div>
      )}
      <GalleryDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        value={currentPhoto}
      />

      {/* Add Photo Dialog */}
      {/* <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Photo</DialogTitle>
            <DialogDescription>
              Upload a new photo to your travel gallery
            </DialogDescription>
          </DialogHeader>
          <GalleryForm isNew={true} value={currentPhoto} />
        </DialogContent>
      </Dialog> */}

      {/* Edit Photo Dialog */}
      {/* <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Photo</DialogTitle>
            <DialogDescription>
              Make changes to your photo details
            </DialogDescription>
          </DialogHeader>
          <GalleryForm isNew={false} value={currentPhoto} />
        </DialogContent>
      </Dialog> */}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this photo? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
