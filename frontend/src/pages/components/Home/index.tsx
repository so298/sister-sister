import { FC } from 'react';

import DrawerSection from './DrawerSection';
import RightCardSection from './RightCardsSection';

export const Home: FC = () => {
  // const [opened, setOpened] = useState<boolean>(false);
  return (
    <>
      <DrawerSection />
      <RightCardSection />
    </>
  );
};
