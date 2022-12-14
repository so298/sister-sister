import { useContext } from 'react';

import { WithoutProviderError } from '../../../../static/error/withoutPrividerError';
import { ModeState, modeStateContext } from '../contexts/ModeContext';

type UseModeState = () => ModeState;

export const useModeState: UseModeState = () => {
  const context = useContext(modeStateContext);

  if (!context) throw new WithoutProviderError();

  return context;
};
