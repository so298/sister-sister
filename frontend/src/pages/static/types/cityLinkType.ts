import { LatLngTuple } from 'leaflet';

export type CityLinkType = {
  type: string;
  coordinates: [LatLngTuple, LatLngTuple];
  geometries?: [];
};
