import { FC } from 'react';

import { DrawerStateProvider } from './contexts/drawerContexts';
import MyDrawer from './elements';

const DrawerSection: FC = () => {
  return (
    <DrawerStateProvider>
      <MyDrawer />
    </DrawerStateProvider>
  );
};

export default DrawerSection;
