import { createContext, ReactNode, FC, useState } from 'react';

export type SearchModeState = {
  searching: boolean;
  setSearching: (value: boolean) => void;
  sourceCityName: string | undefined;
  setSourceCityName: (value: string | undefined) => void;
  targetCityNames: string[] | undefined;
  setTargetCityNames: (value: string[] | undefined) => void;
  selectCard: string | undefined;
  setSelectCard: (value: string | undefined) => void;
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

  const [searching, setSearching] = useState<boolean>(false);
  const [sourceCityName, setSourceCityName] = useState<string | undefined>(
    undefined,
  );
  const [targetCityNames, setTargetCityNames] = useState<string[] | undefined>(
    undefined,
  );
  const [selectCard, setSelectCard] = useState<string | undefined>(undefined);

  return (
    <Provider
      value={{
        searching,
        setSearching,
        sourceCityName,
        setSourceCityName,
        targetCityNames,
        setTargetCityNames,
        selectCard,
        setSelectCard,
      }}
    >
      {children}
    </Provider>
  );
};
