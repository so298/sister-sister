import { Button, createStyles, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { FC, useMemo, useEffect } from 'react';

import dummyData from '../../../../../../data/dummyData.json';
import undefinedData from '../../../../../../data/undefinedData.json';
import { CityDataType } from '../../../../../static/types/cityDataType';
import cityNameIndexHash from '../../../../../utils/cityNameIndexHash';
import { useSearchModeState } from '../../../Provider/hooks/useSearchModeState';
import CityCard from '../../../shared/CityCard';

const data: CityDataType[] = dummyData;
const undefinedItem: CityDataType = undefinedData;

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      padding: theme.spacing.sm,
    },
    visibility: 'visible',
    zIndex: 100,
  },
  wrapper: {
    width: '100%',
  },
  selectedCityWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
}));

const SearchControlPanel: FC = () => {
  const { classes } = useStyles();
  const { setSearching, sourceCityName, setTargetCityNames } =
    useSearchModeState();

  const sourceCityInfo: CityDataType = useMemo(() => {
    let item: CityDataType = undefinedItem;
    if (sourceCityName !== undefined) {
      const sourceCityIndex = cityNameIndexHash.get(sourceCityName);
      if (typeof sourceCityIndex !== 'undefined') {
        item = data[sourceCityIndex];
      } else {
        item.cityName = sourceCityName;
      }
    }
    {
      return item;
    }
  }, [sourceCityName]);

  useEffect(() => {
    if (sourceCityName !== undefined) {
      const sourceCityIndex = cityNameIndexHash.get(sourceCityName);
      if (typeof sourceCityIndex !== 'undefined') {
        const sourceCityInfo: CityDataType = data[sourceCityIndex];
        setTargetCityNames(sourceCityInfo.sisterCities);
      } else {
        setTargetCityNames([]);
      }
    }
  }, [setSearching, sourceCityName, setTargetCityNames]);

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        {sourceCityName ? (
          <div className={classes.selectedCityWrapper}>
            <Title order={1}>Selectd City</Title>
            <CityCard {...sourceCityInfo} />
          </div>
        ) : (
          <Title order={1}>Select City</Title>
        )}
      </div>
      <Button
        size="md"
        radius="md"
        color="blue"
        disabled={!sourceCityName || !sourceCityInfo.wikiUrl}
        leftIcon={<IconSearch />}
        component="a"
        target="_blank"
        rel="noopener noreferrer"
        href={sourceCityInfo.wikiUrl}
      >
        Link to wiki
      </Button>
    </div>
  );
};

export default SearchControlPanel;
