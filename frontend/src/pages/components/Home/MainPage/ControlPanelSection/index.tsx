import { Select, createStyles, Divider } from '@mantine/core';
import { FC } from 'react';

import { modeType } from '../../../../static/types/modeTypes';
import { useModeState } from '../../Provider/hooks/useModeState';

import SearchControlPanel from './SearchControlPanel';

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      padding: theme.spacing.sm,
    },
  },
  selectRoot: {
    width: '100%',
    maxWidth: '200px',
  },
  selectLabel: {
    color: theme.colors.cyan[6],
    fontWeight: 600,
  },
}));

const ControlPanelSection: FC = () => {
  const { classes } = useStyles();
  const { mode, onModeChange } = useModeState();

  return (
    <div className={classes.root}>
      <Select
        label="Select Mode"
        placeholder="Pick one"
        data={Object.values(modeType)}
        defaultValue="search"
        searchable
        required
        onChange={onModeChange}
        classNames={{ root: classes.selectRoot, label: classes.selectLabel }}
        styles={(theme) => ({
          item: {
            // applies styles to selected item
            '&[data-selected]': {
              '&, &:hover': {
                backgroundColor: theme.colors.cyan[1],
                color: theme.colors.black[0],
              },
            },

            // applies styles to hovered item (with mouse or keyboard)
            '&[data-hovered]': {
              backgroundColor: theme.colors.cyan[0],
            },
          },
        })}
        disabled={true}
      />
      <Divider />
      {mode == 'search' && <SearchControlPanel />}
    </div>
  );
};

export default ControlPanelSection;
