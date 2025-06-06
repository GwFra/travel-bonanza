// import { LngLatLike } from "mapbox-gl";

export const stops = [
  // Ew lngLats - boff
  {
    id: 0,
    name: "Toronto, Canada",
    lngLat: {
      lng: -79.4163,
      lat: 43.70011,
    },
    // [-79.4163, 43.70011] as LngLatLike,
    start: new Date("03/20/2025").getTime(),
    image: "toronto.jpg",
    description: "Nippy but big and ol' city lookin",
  },
  {
    id: 1,
    name: "Ottawa, Canada",
    lngLat: {
      lng: -75.69812,
      lat: 45.41117,
    },
    // lngLat: [-75.69812, 45.41117 + 0.04] as LngLatLike,
    start: new Date("03/24/2025").getTime(),
    image: "ottawa.jpeg",
    description: "Bit small for a capital, usual expectations of colonisation",
  },
  {
    id: 2,
    name: "Montreal, Canada",
    lngLat: { id: 0, lng: -73.58781, lat: 45.50884 + 0.04 },
    // lngLat: [-73.58781, 45.50884 + 0.04] as LngLatLike,
    start: new Date("03/28/2025").getTime(),
    image: "montreal.jpg",
    description: "Best place so far!",
  },
  {
    id: 3,
    name: "Quebec City, Canada",
    lngLat: {
      lng: -71.21454,
      lat: 46.81228 + 0.04,
    },
    // lngLat: [-71.21454, 46.81228 + 0.04] as LngLatLike,
    start: new Date("04/01/2025").getTime(),
    image: "quebec.jpg",
    description: "Quebec, more like new France",
  },
  {
    id: 4,
    name: "Calgary, Canada",
    lngLat: {
      lng: -114.06667,
      lat: 51.05 + 0.04,
    },
    // lngLat: [-114.06667, 51.05 + 0.04] as LngLatLike,
    start: new Date("04/06/2025").getTime(),
    image: "calgary.jpg",
    description: "Only 2 hours here...",
  },
  {
    id: 5,
    name: "Banff, Canada",
    lngLat: {
      lng: -115.5708,
      lat: 51.1784 + 0.04,
    },
    // lngLat: [-115.5708, 51.1784 + 0.04] as LngLatLike,
    start: new Date("04/07/2025").getTime(),
    image: "banff.jpg",
    description: "Woah",
  },
  {
    id: 6,
    name: "Jasper, Canada",
    lngLat: {
      lng: -118.0823,
      lat: 52.8733 + 0.04,
    },
    // lngLat: [-118.0823, 52.8733 + 0.04] as LngLatLike,
    start: new Date("04/13/2025").getTime(),
    image: "jasper.jpg",
    description: "WOAH",
  },
  {
    id: 7,
    name: "Vancouver, Canada",
    lngLat: {
      lng: -123.1207,
      lat: 49.2827 + 0.04,
    },
    // lngLat: [-123.1207, 49.2827 + 0.04] as LngLatLike,
    start: new Date("04/16/2025").getTime(),
    image: "vancouver.jpg",
    description: "So far away",
  },
  {
    id: 8,
    name: "Victoria, Canada",
    lngLat: {
      lng: -123.3656,
      lat: 48.4284 + 0.04,
    },
    // lngLat: [-123.3656, 48.4284 + 0.04] as LngLatLike,
    start: new Date("04/20/2025").getTime(),
    description: "A little bit further away",
  },
  {
    id: 9,
    name: "Honolulu, USA",
    lngLat: {
      lng: -157.8583,
      lat: 21.3069 + 0.04,
    },
    // lngLat: [-157.8583, 21.3069 + 0.04] as LngLatLike,
    start: new Date("04/24/2025").getTime(),
    description: "USA USA",
  },
  {
    id: 10,
    name: "Big Island, USA",
    lngLat: {
      lng: -155.5828,
      lat: 19.5429 + 0.04,
    },
    // lngLat: [-155.5828, 19.5429 + 0.04] as LngLatLike,
    start: new Date("04/26/2025").getTime(),
    description: "Most southern place in the states",
  },
  {
    id: 11,
    name: "Maui, USA",
    lngLat: {
      lng: -156.3319,
      lat: 20.7984 + 0.04,
    },
    // lngLat: [-156.3319, 20.7984 + 0.04] as LngLatLike,
    start: new Date("05/07/2025").getTime(),
    description: "Moi moi",
  },
  {
    id: 12,
    name: "Sydney, Australisa",
    lngLat: {
      lng: 151.2093,
      lat: -33.8688 + 0.04,
    },
    // lngLat: [151.2093, -33.8688 + 0.04] as LngLatLike,
    start: new Date("05/17/2025").getTime(),
    description: "",
  },
  {
    id: 13,
    name: "Queenstown, New Zealand",
    lngLat: {
      lng: 168.6626,
      lat: -45.0312 + 0.04,
    },
    // lngLat: [168.6626, -45.0312 + 0.04] as LngLatLike,
    start: new Date("05/18/2025").getTime(),
    description: "",
  },
];
