import { Calendar } from "lucide-react";
import { Card, CardContent } from "./ui/card";
// import { Button } from "./ui/button";
import Image from "next/image";
import { stops } from "@/data/locations";
import placeholder from "@/app/favicon.ico";

type ItemProps = {
  destination: (typeof stops)[0];
};

export function PlaceCarouselItem({ destination }: ItemProps) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={`/${destination.image}` || placeholder}
          alt={"Something"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">
            {destination.name}
          </h3>
          <div className="flex items-center text-white/80 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(destination.start).toDateString()}</span>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-muted-foreground line-clamp-2">
          {destination.description}
        </p>
        {/* <Button variant="link" className="p-0 h-auto mt-2 font-medium">
          Read more
        </Button> */}
      </CardContent>
    </Card>
  );
}
