import {
  AppShell,
  Navbar,
  Header,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  createStyles,
  ActionIcon,
  Transition,
} from '@mantine/core';
import { IconChevronsLeft, IconChevronsRight } from '@tabler/icons';
import { useState, FC } from 'react';

import ControlPanelSection from './ControlPanelSection';
import RightCardSection from './RightCardsSection';

const useStyles = createStyles(() => ({
  root: { padding: 'md', width: '100%', overflow: 'scroll' },
  chevrons: { margin: '0 auto', alignItems: 'right' },
  aside: { overflow: 'scroll' },
}));

const scaleXRightCards = {
  in: { opacity: 1, transform: 'translateX(0)' },
  out: { opacity: 0, transform: 'translateX(40%)' },
  common: { transformOrigin: 'right' },
  transitionProperty: 'transform, opacity',
};
const scaleXControlPanel = {
  in: { opacity: 1, transform: 'translateX(0)' },
  out: { opacity: 0, transform: 'translateX(-20vw)' },
  common: { transformOrigin: 'left' },
  transitionProperty: 'transform, opacity',
};

const MainPage: FC = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [controlPanelOpened, setControlPanelOpened] = useState<boolean>(false);
  const [rightCardOpend, setRightCardOpend] = useState<boolean>(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Transition
          mounted={controlPanelOpened}
          transition={scaleXControlPanel}
          duration={500}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={{ ...styles }}>
              <Navbar
                hiddenBreakpoint={theme.breakpoints.xl}
                hidden={!controlPanelOpened}
                width={{ sm: 300, lg: 300, md: 300 }}
              >
                <ControlPanelSection />
              </Navbar>
            </div>
          )}
        </Transition>
      }
      aside={
        <Aside
          className={classes.aside}
          hiddenBreakpoint={theme.breakpoints.xl}
          hidden={!rightCardOpend}
          width={{ sm: 300, lg: 400 }}
        >
          <Transition
            mounted={rightCardOpend}
            transition={scaleXRightCards}
            duration={500}
            timingFunction="ease"
          >
            {(styles) => (
              <div style={{ ...styles, width: '100%' }}>
                <RightCardSection />
              </div>
            )}
          </Transition>
        </Aside>
      }
      header={
        <Header
          height={70}
          p="md"
          style={{ backgroundColor: theme.colors.cyan[4] }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <MediaQuery
              largerThan={theme.breakpoints.xl}
              styles={{ display: 'none' }}
            >
              <Burger
                opened={controlPanelOpened}
                onClick={() =>
                  setControlPanelOpened(
                    (prevControlPanelOpened) => !prevControlPanelOpened,
                  )
                }
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
                transitionDuration={500}
              />
            </MediaQuery>

            <Text>Application header</Text>
            <ActionIcon
              className={classes.chevrons}
              onClick={() =>
                setRightCardOpend((prevRightCardOpend) => !prevRightCardOpend)
              }
              size="md"
              color={theme.colors.gray[6]}
              mr="xl"
              //transitionDuration={500}
            >
              {rightCardOpend ? (
                <IconChevronsRight size="md" color={theme.colors.gray[6]} />
              ) : (
                <IconChevronsLeft size="md" color={theme.colors.gray[6]} />
              )}
            </ActionIcon>
          </div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
};

export default MainPage;
