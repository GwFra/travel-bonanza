import { LngLatLike } from "mapbox-gl";

export const stops = [
  // Ew lngLats
  {
    name: "Toronto, Canada",
    lngLat: [-79.4163, 43.70011] as LngLatLike,
  },
  {
    name: "Ottawa, Canada",
    lngLat: [-75.69812, 45.41117 + 0.04] as LngLatLike,
  },
  {
    name: "Montreal, Canada",
    lngLat: [-73.58781, 45.50884 + 0.04] as LngLatLike,
  },
  {
    name: "Quebec City, Canada",
    lngLat: [-71.21454, 46.81228 + 0.04] as LngLatLike,
  },
  { name: "Calgary, Canada", lngLat: [-114.06667, 51.05 + 0.04] as LngLatLike },
  { name: "Banff, Canada", lngLat: [-115.5708, 51.1784 + 0.04] as LngLatLike },
  { name: "Jasper, Canada", lngLat: [-118.0823, 52.8733 + 0.04] as LngLatLike },
  {
    name: "Vancouver, Canada",
    lngLat: [-123.1207, 49.2827 + 0.04] as LngLatLike,
  },
  {
    name: "Victoria, Canada",
    lngLat: [-123.3656, 48.4284 + 0.04] as LngLatLike,
  },
  { name: "Honolulu, USA", lngLat: [-157.8583, 21.3069 + 0.04] as LngLatLike },
  {
    name: "Big Island, USA",
    lngLat: [-155.5828, 19.5429 + 0.04] as LngLatLike,
  },
  { name: "Maui, USA", lngLat: [-156.3319, 20.7984 + 0.04] as LngLatLike },
  {
    name: "Sydney, Australisa",
    lngLat: [151.2093, -33.8688 + 0.04] as LngLatLike,
  },
  {
    name: "Queenstown, New Zealand",
    lngLat: [168.6626, -45.0312 + 0.04] as LngLatLike,
  },
];
