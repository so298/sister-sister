import { MantineThemeOverride } from '@mantine/core';

import { breakpoints } from './breakpoints';
import { colorsPallet } from './colors';
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
