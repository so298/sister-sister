import { createContext, ReactNode, FC, useState } from 'react';

export type SearchModeState = {
  sourceCountryPrefectureName: string | undefined;
  setSourceCountryPrefectureName: (value: string | undefined) => void;
  sourceCityName: string | undefined;
  setSourceCityName: (value: string | undefined) => void;
  targetCityNames: string[] | undefined;
  setTargetCityNames: (value: string[] | undefined) => void;
  selectedCard: string | undefined;
  setSelectedCard: (value: string | undefined) => void;
  hoveredCard: string | undefined;
  setHoveredCard: (value: string | undefined) => void;
};

export const searchModeStateContext = createContext<
  SearchModeState | undefined
>(undefined);

const { Provider } = searchModeStateContext;

interface SearchModeStateProviderProps {
  children: ReactNode;
}
export const SearchModeStateProvider: FC<SearchModeStateProviderProps> = (
  props,
) => {
  const { children } = props;

  const [sourceCountryPrefectureName, setSourceCountryPrefectureName] =
    useState<string | undefined>(undefined);
  const [sourceCityName, setSourceCityName] = useState<string | undefined>(
    undefined,
  );
  const [targetCityNames, setTargetCityNames] = useState<string[] | undefined>(
    undefined,
  );
  const [selectedCard, setSelectedCard] = useState<string | undefined>(
    undefined,
  );
  const [hoveredCard, setHoveredCard] = useState<string | undefined>(undefined);

  return (
    <Provider
      value={{
        sourceCountryPrefectureName,
        setSourceCountryPrefectureName,
        sourceCityName,
        setSourceCityName,
        targetCityNames,
        setTargetCityNames,
        selectedCard,
        setSelectedCard,
        hoveredCard,
        setHoveredCard,
      }}
    >
      {children}
    </Provider>
  );
};
