"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  Search,
  Globe,
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
// Import the sample journey data
import { stops as initialLocations } from "@/data/locations";
import { LocationDialog } from "./locationDialog";
export type Locations = (typeof initialLocations)[0];

export default function LocationManager() {
  const [locations, setLocations] = useState(initialLocations);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<
    Locations | undefined
  >();
  const [sortOrder, setSortOrder] = useState("chronological");

  // Filter locations based on search term
  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort locations based on selected order
  const sortedLocations = [...filteredLocations].sort((a, b) => {
    if (sortOrder === "chronological") {
      return a.id - b.id;
    } else if (sortOrder === "alphabetical") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const handleAddLocation = () => {
    setCurrentLocation(undefined);
    setIsDialogOpen(true);
  };

  const handleEditLocation = (location: Locations) => {
    setCurrentLocation(location);
    setIsDialogOpen(true);
  };

  const handleDeleteLocation = (location: Locations) => {
    setCurrentLocation(location);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setLocations(
      locations.filter((location) => location.id !== currentLocation?.id)
    );
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search locations..."
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
              <SelectItem value="chronological">Chronological</SelectItem>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleAddLocation} className="whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Add Location
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedLocations.map((location) => (
          <Card key={location.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={`/${location.image}` || "/placeholder.svg"}
                alt={location.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white">
                  {location.name}
                </h3>
                <div className="flex items-center text-white/90 text-sm">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{new Date(location.start).toDateString()}</span>
                </div>
              </div>
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
                    <DropdownMenuItem
                      onClick={() => handleEditLocation(location)}
                    >
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteLocation(location)}
                      className="text-red-500 focus:text-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2 min-h-[2lh]">
                {location.description}
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Globe className="h-3 w-3 mr-1" />
                <span>
                  {location.lngLat.lat.toFixed(4)},{" "}
                  {location.lngLat.lng.toFixed(4)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedLocations.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            {searchTerm
              ? "No locations match your search"
              : "No locations added yet"}
          </p>
        </div>
      )}

      <LocationDialog
        value={currentLocation}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />

      {/* Add Location Dialog */}
      {/* <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Add a new destination to your journey
            </DialogDescription>
          </DialogHeader>
          <LocationForm isNew={true} value={currentLocation} />
        </DialogContent>
      </Dialog> */}

      {/* Edit Location Dialog */}
      {/* <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Make changes to your journey destination
            </DialogDescription>
          </DialogHeader>
          <LocationForm isNew={false} value={currentLocation} />
        </DialogContent>
      </Dialog> */}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this location? This action cannot
              be undone.
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
