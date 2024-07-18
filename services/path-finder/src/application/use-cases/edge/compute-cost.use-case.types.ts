export type RouteResponse = {
  code: string;
  distances: number[][];
  destinations: LocationPoint[];
  durations: number[][];
  sources: LocationPoint[];
};
type LocationPoint = {
  hint: string;
  distance: number;
  name: string;
  location: [number, number];
};
