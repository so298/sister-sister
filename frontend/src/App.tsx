import { MantineProvider } from '@mantine/core';
import { FC } from 'react';
import { lightTheme } from './styles/theme';
import { SwitchPage } from './pages';

const App: FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={lightTheme}>
      <SwitchPage />
    </MantineProvider>
  );
};

export default App;
