import { createStyles } from '@mantine/core';
import { FC, useMemo } from 'react';

import dummyData from '../../../../../data/dummyData.json';
import { CityDataType } from '../../../../static/types/cityDataType';
import cityNameIndexHash from '../../../../utils/cityNameIndexHash';
import { useModeState } from '../../Provider/hooks/useModeState';
import { useSearchModeState } from '../../Provider/hooks/useSearchModeState';

import JsonData from './contents/content.json';
import RightCard, { RightCardProps } from './elements/RightCard';

const data: CityDataType[] = dummyData;

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    justifyContent: 'start',
    alignItems: 'center',
  },
}));

const RightCardSection: FC = () => {
  const Items: CityDataType[] = JsonData;
  const { mode } = useModeState();
  const { targetCityNames } = useSearchModeState();

  const { classes } = useStyles();

  const cardItems: RightCardProps[] = useMemo(() => {
    const items: RightCardProps[] = [];
    targetCityNames?.forEach((d) => {
      const targetCityIndex = Number(cityNameIndexHash.get(d));
      const targetCityInfo: CityDataType = data[targetCityIndex];
      items.push(targetCityInfo);
    });
    {
      return items;
    }
  }, [targetCityNames]);

  return (
    <div className={classes.root}>
      {[...cardItems, ...Items].map((cardItem, i) => (
        <RightCard {...cardItem} key={i} />
      ))}
    </div>
  );
};

export default RightCardSection;
