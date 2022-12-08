import { MantineProvider } from '@mantine/core';
import { FC } from 'react';

import { SwitchPage } from './pages';
import { lightTheme } from './styles/theme';

const App: FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={lightTheme}>
      <SwitchPage />
    </MantineProvider>
  );
};

export default App;
