"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Photos = {
  id: number;
  src: string;
  date: string;
  location: string;
  description: string;
};

// https://developers.facebook.com/docs/instagram-platform/oembed
// Thinking of embedding our instagram posts

// Sample photo data
const photos = [
  {
    id: 1,
    src: "/placeholder.svg?height=600&width=800",
    date: "2023-06-15",
    location: "Tokyo, Japan",
    description: "Vibrant street scene in Shibuya Crossing",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=600&width=800",
    date: "2023-06-18",
    location: "Kyoto, Japan",
    description: "Serene moments at the Kinkaku-ji Golden Pavilion",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=600&width=800",
    date: "2023-06-22",
    location: "Bali, Indonesia",
    description: "Sunset at Tanah Lot Temple",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=600&width=800",
    date: "2023-06-25",
    location: "Bali, Indonesia",
    description: "Rice terraces in Tegalalang",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=600&width=800",
    date: "2023-06-30",
    location: "Sydney, Australia",
    description: "Iconic view of Sydney Opera House",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=600&width=800",
    date: "2023-07-03",
    location: "Sydney, Australia",
    description: "Bondi Beach on a sunny day",
  },
  // Add more photos as needed
];

// Helper function to group photos by month and year
const groupPhotosByDate = (photos: Photos[]): { [key: string]: Photos[] } => {
  return photos.reduce((groups, photo) => {
    const date = new Date(photo.date);
    const monthYear = format(date, "MMMM yyyy");
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(photo);
    return groups;
  }, {} as { [key: string]: Photos[] });
};

// Helper function to get unique locations
const getUniqueLocations = (photos: Photos[]): string[] => {
  return Array.from(new Set(photos.map((photo) => photo.location)));
};

const PhotoCard = ({
  photo,
  onClick,
}: {
  photo: Photos;
  onClick: Dispatch<SetStateAction<Photos | null>>;
}) => (
  <Card
    className="overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
    onClick={() => onClick(photo)}
  >
    <div className="relative aspect-square">
      <Image
        src={photo.src || "/placeholder.svg"}
        alt={photo.description}
        fill
        className="object-cover"
      />
    </div>
    <CardContent className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm mb-1 line-clamp-1">
            {photo.description}
          </h3>
          <div className="flex items-center text-muted-foreground text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{photo.location}</span>
          </div>
        </div>
        <div className="text-muted-foreground text-xs flex items-center w-fit whitespace-nowrap flex-shrink-0">
          <Calendar className="h-3 w-3 mr-1" />
          <span>{format(new Date(photo.date), "MMM d, yyyy")}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function GalleryPage() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [filteredPhotos, setFilteredPhotos] = useState<Photos[]>(photos);
  const [selectedPhoto, setSelectedPhoto] = useState<Photos | null>(null);

  const locations = ["All Locations", ...getUniqueLocations(photos)];

  useEffect(() => {
    if (selectedLocation === "All Locations") {
      setFilteredPhotos(photos);
    } else {
      setFilteredPhotos(
        photos.filter((photo) => photo.location === selectedLocation)
      );
    }
  }, [selectedLocation]);

  const groupedPhotos = groupPhotosByDate(filteredPhotos);

  return (
    <div className="px-12">
      <h1 className="text-4xl font-bold text-center mb-4">Travel Gallery</h1>
      <p className="text-center text-muted-foreground mb-8">
        Relive our journey through photos, sorted by date and filterable by
        location.
      </p>

      <div className="flex justify-end mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[200px]">
              {selectedLocation} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            {locations.map((location) => (
              <DropdownMenuItem
                key={location}
                onSelect={() => setSelectedLocation(location)}
              >
                {location}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {Object.entries(groupedPhotos).map(([monthYear, photos]) => (
        <div key={monthYear} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{monthYear}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={setSelectedPhoto}
              />
            ))}
          </div>
        </div>
      ))}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedPhoto?.description}</DialogTitle>
            <DialogDescription>
              {selectedPhoto?.location} -{" "}
              {selectedPhoto &&
                format(new Date(selectedPhoto.date), "MMMM d, yyyy")}
            </DialogDescription>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            {selectedPhoto && (
              <Image
                src={selectedPhoto.src || "/placeholder.svg"}
                alt={selectedPhoto.description}
                fill
                className="object-cover"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
