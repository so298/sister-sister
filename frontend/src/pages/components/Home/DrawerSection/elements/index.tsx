import { Drawer, Button, Group } from '@mantine/core';
import { FC, useState } from 'react';

// import { useDrawerState } from '../hooks/useDrawerState';

const MyDrawer: FC = () => {
  // const { mode, onModeChange } = useDrawerState();
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        {/* Drawer content */}
      </Drawer>

      <Group position="center">
        <Button onClick={() => setOpened(true)} color="blue">
          Open Drawer
        </Button>
      </Group>
    </>
  );
};

export default MyDrawer;
