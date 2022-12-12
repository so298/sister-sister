import { Select, createStyles, Divider } from '@mantine/core';
import { FC, useState } from 'react';

import { ModeType, modeType } from '../../../../static/types/modeTypes';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      padding: theme.spacing.sm,
    },
  },
}));

const ControlPanelSection: FC = () => {
  const { classes } = useStyles();
  const [mode, setMode] = useState<ModeType>('search');
  //   const data =
  return (
    <div className={classes.root}>
      <Select
        label="Select Mode"
        placeholder="Pick one"
        data={Object.values(modeType)}
        searchable
        required
        onChange={(value: ModeType) => setMode(value)}
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
      />
      <Divider />
    </div>
  );
};

export default ControlPanelSection;
