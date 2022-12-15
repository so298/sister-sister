import { createStyles } from '@mantine/core';
import { FC, useMemo } from 'react';

import dummyData from '../../../../../data/dummyData.json';
import undefinedData from '../../../../../data/undefinedData.json';
import { CityDataType } from '../../../../static/types/cityDataType';
import cityNameIndexHash from '../../../../utils/cityNameIndexHash';
import { useModeState } from '../../Provider/hooks/useModeState';
import { useSearchModeState } from '../../Provider/hooks/useSearchModeState';

import RightCard, { RightCardProps } from './elements/RightCard';

const data: CityDataType[] = dummyData;
const undefindItem: CityDataType = undefinedData;

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
  const { mode } = useModeState();
  const { targetCityNames } = useSearchModeState();

  const { classes } = useStyles();

  const cardItems: RightCardProps[] = useMemo(() => {
    const items: RightCardProps[] = [];
    targetCityNames?.forEach((d) => {
      const targetCityIndex = cityNameIndexHash.get(d);
      if (typeof targetCityIndex !== 'undefined') {
        const targetCityInfo: CityDataType = data[targetCityIndex];
        items.push(targetCityInfo);
      } else {
        items.push(undefindItem);
      }
    });
    {
      return items;
    }
  }, [targetCityNames]);

  return (
    <div className={classes.root}>
      {[...cardItems].map((cardItem, i) => (
        <RightCard {...cardItem} key={i} />
      ))}
    </div>
  );
};

export default RightCardSection;
