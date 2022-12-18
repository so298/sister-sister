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
import { useState, FC, useEffect } from 'react';

import { useSearchModeState } from '../Provider/hooks/useSearchModeState';

import ControlPanelSection from './ControlPanelSection';
import MapSection from './MapSection';
import RightCardSection from './RightCardsSection';

const useStyles = createStyles((theme) => ({
  chevrons: { margin: '0 auto', alignItems: 'right' },
  aside: { overflow: 'auto' },
  title: {
    color: theme.colors.white[6],
    fontWeight: 'bold',
    fontSize: 3 * theme.spacing.xs,
    letterSpacing: theme.spacing.xs / 2,
  },
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
  const [controlPanelOpened, setControlPanelOpened] = useState<boolean>(true);
  const [rightCardOpend, setRightCardOpened] = useState<boolean>(false);
  const { sourceCountryPrefectureName } = useSearchModeState();

  useEffect(() => {
    sourceCountryPrefectureName && setRightCardOpened(true);
  }, [sourceCountryPrefectureName]);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.gray[0],
          padding: '0',
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          zIndex={100}
          fixed={true}
          hiddenBreakpoint={theme.breakpoints.xl}
          hidden={!controlPanelOpened}
          width={{ sm: 300, lg: 300, md: 300 }}
        >
          <Transition
            mounted={controlPanelOpened}
            transition={scaleXControlPanel}
            duration={500}
            timingFunction="ease"
          >
            {(styles) => <div style={{ ...styles }}></div>}
          </Transition>
          <ControlPanelSection />
        </Navbar>
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
                size="md"
                color={theme.colors.white[6]}
                mr="lg"
                transitionDuration={500}
              />
            </MediaQuery>

            <Text className={classes.title}>SISTER×SISTER</Text>
            <ActionIcon
              className={classes.chevrons}
              onClick={() =>
                setRightCardOpened(
                  (prevRightCardOpened) => !prevRightCardOpened,
                )
              }
              size="xl"
              color={theme.colors.white[0]}
              mr="sm"
              //transitionDuration={500}
            >
              {rightCardOpend ? (
                <IconChevronsRight
                  size="lg"
                  color={theme.colors.white[6]}
                  strokeWidth={1.3}
                />
              ) : (
                <IconChevronsLeft
                  size="lg"
                  color={theme.colors.white[6]}
                  strokeWidth={1.3}
                />
              )}
            </ActionIcon>
          </div>
        </Header>
      }
    >
      <MapSection />
    </AppShell>
  );
};

export default MainPage;
