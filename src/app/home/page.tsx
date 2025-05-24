"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { PlaceCarouselItem } from "@/components/PlaceCarousel";
import { useRouter } from "next/navigation";
import { stops } from "@/data/locations";
import { gallery } from "@/data/gallery";

export default function HomePage() {
  const router = useRouter();

  const handleViewSwitch = (route: string) => {
    router.push(route);
  };

  // Discover latest destinations...
  // anything from the lat few weeks?
  const displayLatestStops = () => {
    const curr = Date.now();
    const latest = stops.filter(({ start }) => start <= curr);
    return latest.slice(Math.max(latest.length - 3, 0));
  };

  return (
    <>
      <section className="relative h-[70vh]">
        <Image
          src="/background.jpg"
          alt="Beautiful travel destination"
          fill
          className="object-cover"
          priority
        />
        <div className="relative h-full flex flex-col justify-center items-start px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-2xl">
            Follow along with our travels
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
            Something amazing I guess
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => handleViewSwitch("/destinations")}
          >
            Explore Destinations
          </Button>
        </div>
      </section>

      {/* Recent Destinations */}
      <section id="destinations" className="py-16 bg-muted/30">
        <div className="px-4 w-full">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Recent Adventures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayLatestStops().map((destination, index) => (
              <PlaceCarouselItem key={index} destination={destination} />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              onClick={() => handleViewSwitch("/destinations")}
            >
              View All Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-16">
        <div className="px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Photo Gallery</h2>
            <Button
              variant="ghost"
              className="gap-1"
              onClick={() => handleViewSwitch("/gallery")}
            >
              <Camera className="h-4 w-4" />
              <span>View All</span>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map(({ image }, index) => {
              return (
                <div
                  key={index}
                  className="relative aspect-square overflow-hidden rounded-md group"
                >
                  <Image
                    src={`/gallery/${image}`}
                    alt={`Travel photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100"
                      onClick={() => handleViewSwitch("/gallery")}
                    >
                      View
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="max-w-xl mx-auto mb-8">
            Subscribe to my newsletter to receive updates on my latest
            adventures, travel tips, and exclusive content.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button className="bg-background text-primary hover:bg-background/90">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
