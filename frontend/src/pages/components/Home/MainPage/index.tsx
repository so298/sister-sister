import {
  AppShell,
  Navbar,
  Header,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import { useState, FC } from 'react';

const MainPage: FC = () => {
  const theme = useMantineTheme();
  const [contoroloPanelOpened, setContorolPanelOpend] =
    useState<boolean>(false);
  const [rightCardOpend, setRightCardOpend] = useState<boolean>(true);
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
        <Navbar
          p="md"
          hiddenBreakpoint={theme.breakpoints.xl}
          hidden={!contoroloPanelOpened}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application navbar</Text>
        </Navbar>
      }
      aside={
        <Aside
          p="md"
          hiddenBreakpoint={theme.breakpoints.xl}
          hidden={!rightCardOpend}
          width={{ sm: 200, lg: 300 }}
        >
          <Text>Application sidebar</Text>
        </Aside>
      }
      header={
        <Header
          height={{ base: 50, md: 70 }}
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
                opened={contoroloPanelOpened}
                onClick={() => setContorolPanelOpend(!contoroloPanelOpened)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
                transitionDuration={500}
              />
            </MediaQuery>

            <Text>Application header</Text>
            <Burger
              opened={rightCardOpend}
              onClick={() => setRightCardOpend(!rightCardOpend)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
              transitionDuration={500}
            />
          </div>
        </Header>
      }
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
};

export default MainPage;
