import { createContext, ReactNode, FC, useState, useCallback } from 'react';

import { ModeType } from '../../../../static/types/modeTypes';

export type ModeState = {
  mode: ModeType;
  onModeChange: (value: ModeType) => void;
};

export const modeStateContext = createContext<ModeState | undefined>(undefined);

const { Provider } = modeStateContext;

interface ModeStateProviderProps {
  children: ReactNode;
}
export const ModeStateProvider: FC<ModeStateProviderProps> = (props) => {
  const { children } = props;

  const [mode, setMode] = useState<ModeType>('search');
  const onModeChange = useCallback((value: ModeType) => {
    setMode(value);
  }, []);

  return <Provider value={{ mode, onModeChange }}>{children}</Provider>;
};
