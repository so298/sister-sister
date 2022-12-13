import { createContext, FC, ReactNode, useState, useCallback } from 'react';

import SampleData from '../contents/content.json';

export type cityItem = {
  cityName: string;
  position: {
    longitude: number;
    latitude: number;
  };
  image: string;
  country: string;
  population: number;
  area: number;
  sisterCities: string[];
  wikiUrl: string;
};

export const CardDataContext = createContext<cityItem[] | undefined>(undefined);

const { Provider } = CardDataContext;

interface CardDataProviderProps {
  children: ReactNode;
}

export const DrawerStateProvider: FC<CardDataProviderProps> = (props) => {
  const { children } = props;
  const items: cityItem[] = SampleData;

  const [cities, setCities] = useState<cityItem[]>(items);
  const onItemChange = useCallback((value: cityItem[]) => {
    setCities(value);
  }, []);

  return <Provider value={{ cities, onItemChange }}>{children}</Provider>;
};
