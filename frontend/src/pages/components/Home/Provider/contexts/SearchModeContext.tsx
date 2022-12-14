import { createContext, ReactNode, FC, useState } from 'react';

export type SearchModeState = {
  searching: boolean;
  setSearching: (value: boolean) => void;
  sourceCity: string | undefined;
  setSourceCity: (value: string | undefined) => void;
  targetCity: string | undefined;
  setTargetCity: (value: string | undefined) => void;
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
  const [sourceCity, setSourceCity] = useState<string | undefined>(undefined);
  const [targetCity, setTargetCity] = useState<string | undefined>(undefined);

  return (
    <Provider
      value={{
        searching,
        setSearching,
        sourceCity,
        setSourceCity,
        targetCity,
        setTargetCity,
      }}
    >
      {children}
    </Provider>
  );
};
