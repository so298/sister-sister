import { useContext } from 'react';

import { WithoutProviderError } from '../../../../static/error/withoutPrividerError';
import {
  SearchModeState,
  searchModeStateContext,
} from '../contexts/SearchModeContext';

type UseSearchModeState = () => SearchModeState;

export const useSearchModeState: UseSearchModeState = () => {
  const context = useContext(searchModeStateContext);

  if (!context) throw new WithoutProviderError();

  return context;
};
