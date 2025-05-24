"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import mapboxgl from "mapbox-gl";
import { motion } from "framer-motion";
import "mapbox-gl/dist/mapbox-gl.css";
import { stops } from "@/data/locations";
import { Position } from "geojson";

// Step indicator component
const StepIndicator = ({
  currentStep,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  const [displayStops, setDisplayStops] = useState(stops.slice(0, 5));

  useEffect(() => {
    const stopsToDisplay = stops.slice(currentStep - 2, currentStep + 3);
    const s =
      currentStep < 3
        ? stops.slice(0, 5)
        : currentStep > stops.length - 3
        ? stops.slice(-5)
        : stopsToDisplay;

    setDisplayStops(s);
  }, [currentStep]);

  const progress = () => {
    if (currentStep === 0) return 0;
    if (currentStep === 1) return 25;
    if (currentStep === stops.length - 2) return 75;
    if (currentStep === stops.length - 1) return 100;
    return 50;
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="flex justify-between mb-2">
        {displayStops.map((stop, index) => {
          return (
            <div key={index} className="flex flex-col items-center w-1/5">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= progress() / 25
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
                animate={{
                  scale:
                    stop.name === stops[currentStep].name ? [1, 1.2, 1] : 1,
                  transition: {
                    duration: 0.5,
                    times: [0, 0.5, 1],
                  },
                }}
              >
                <MapPin className="h-4 w-4" />
              </motion.div>
              <div className="hidden sm:block text-xs mt-1 text-muted-foreground">
                {stop.name.split(",")[0]}
              </div>
            </div>
          );
        })}
      </div>
      <div className="inline-flex w-full px-10">
        <Progress value={progress()} className="h-2 grow" />
      </div>
    </div>
  );
};

export default function JourneyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [map, setMap] = useState<mapboxgl.Map>();
  const [disableMove, setDisableMove] = useState(false);

  const totalSteps = stops.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      map?.flyTo({ center: stops[currentStep + 1].lngLat });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      map?.flyTo({ center: stops[currentStep + -1].lngLat });
    }
  };

  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/gwfranklin/cm7yvssvo01b701sb9qkaekf4",
      projection: "globe", // Display the map as a globe, since satellite-v9 defaults to Mercator
      zoom: 8,
      center: stops[0].lngLat,
      accessToken: process.env.MAPBOX_ACCESS_TOKEN,
      doubleClickZoom: false,
      touchZoomRotate: false,
      scrollZoom: false,
      dragPan: false,
      dragRotate: false,
    });

    // Add the marker to the map
    stops.map(({ lngLat }) => {
      new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
    });

    map.on("load", () => {
      // Add lines between stops
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: stops.map(({ lngLat }) => [
              lngLat.lng,
              lngLat.lat,
            ]) as Position[],
          },
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 4,
          "line-dasharray": [10, 5],
        },
      });
    });

    map.on("movestart", () => {
      setDisableMove(true);
    });

    map.on("moveend", () => {
      setDisableMove(false);
    });

    setMap(map);

    return () => map.remove();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">
        Follow Our Journey
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Click through the destinations of our trip!
      </p>
      <div
        ref={mapContainerRef}
        className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8"
      />
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      <div className="flex justify-between mt-12">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0 || disableMove}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous Stop
        </Button>

        <Button
          onClick={handleNext}
          disabled={currentStep === totalSteps - 1 || disableMove}
          className="flex items-center"
        >
          Next Stop
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
