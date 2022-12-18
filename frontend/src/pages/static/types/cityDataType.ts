export type CityDataType = {
  cityName: string;
  position: {
    longitude: number;
    latitude: number;
  };
  country: string;
  prefecture: string;
  population?: number;
  area?: number;
  wikiUrl: string;
  wikiUrlEn: string;
  description?: string;
  image?: string;
  sisterCities: string[];
  descriptionEn?: string;
};
