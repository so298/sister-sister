export type CityDataType = {
  cityName: string;
  position: {
    longitude: number;
    latitude: number;
  };
  image?: string;
  country: string;
  population: number;
  area: number;
  sisterCities: string[];
  description?: string;
  wikiUrl: string;
};
