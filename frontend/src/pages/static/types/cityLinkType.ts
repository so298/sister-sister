export type LngLatTuple = [number, number];

export type CityLinkType = {
  type: string;
  coordinates: LngLatTuple[];
  geometries?: [];
};
