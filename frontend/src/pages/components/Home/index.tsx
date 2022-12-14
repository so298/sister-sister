import { FC } from 'react';

import MainPage from './MainPage';
import { ModeStateProvider } from './Provider/contexts/ModeContext';
import { SearchModeStateProvider } from './Provider/contexts/SearchModeContext';

export const Home: FC = () => {
  return (
    <>
      <ModeStateProvider>
        <SearchModeStateProvider>
          <MainPage />
        </SearchModeStateProvider>
      </ModeStateProvider>
    </>
  );
};
