import { createContext, ReactNode, FC, useState, useCallback } from 'react';

import { ModeType } from '../../../../static/types/modeTypes';

export type DrawerState = {
  mode: ModeType;
  onModeChange: (value: ModeType) => void;
};

export const drawerStateContext = createContext<DrawerState | undefined>(
  undefined,
);

const { Provider } = drawerStateContext;

interface DrawerStateProviderProps {
  children: ReactNode;
}

export const DrawerStateProvider: FC<DrawerStateProviderProps> = (props) => {
  const { children } = props;

  const [mode, setMode] = useState<ModeType>('map');
  const onModeChange = useCallback((value: ModeType) => {
    setMode(value);
  }, []);

  return <Provider value={{ mode, onModeChange }}>{children}</Provider>;
};
