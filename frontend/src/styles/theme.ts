import { MantineThemeOverride } from '@mantine/core';

import { colorsPallet } from './colors';
import { breakpoints } from './breakpoints';
import { spacing } from './spacing';

export const lightTheme: MantineThemeOverride = {
  colorScheme: 'light',
  datesLocale: 'ja',
  colors: colorsPallet,
  primaryColor: 'primary',
  loader: 'dots',
  breakpoints,
  spacing,
};
