import { FC } from 'react';

import DrawerSection from './DrawerSection';
import HeaderSection from './HeaderSection';

export const Home: FC = () => {
  // const [opened, setOpened] = useState<boolean>(false);
  return (
    <>
      <HeaderSection />
      <DrawerSection />
    </>
  );
};
