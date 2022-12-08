import { useContext } from 'react';

import { WithoutProviderError } from '../../../../static/error/withoutPrividerError';
import { DrawerState, drawerStateContext } from '../contexts/drawerContexts';

type UseDrawerState = () => DrawerState;

export const useDrawerState: UseDrawerState = () => {
  const context = useContext(drawerStateContext);

  if (!context) throw new WithoutProviderError();

  return context;
};
