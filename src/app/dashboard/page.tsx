"use client";

import { ImageIcon, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GalleryManager from "@/components/dashboard/gallery";
import LocationManager from "@/components/dashboard/location";

export default function AdminDashboard() {
  return (
    <>
      <div className="py-8 px-4 w-full">
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-1/2 grid-cols-2 mb-4">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Gallery Management
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Journey Locations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-4">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="locations" className="space-y-4">
            <LocationManager />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
