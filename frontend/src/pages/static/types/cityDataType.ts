export type CityData = {
  name: string;
  position: {
    long: number;
    lat: number;
  };
  sisterCities: string[];
  image?: string;
  country?: string;
  population?: number;
  area?: number;
  wikiUrl?: string;
};
