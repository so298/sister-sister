import { Button, createStyles } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { FC, useCallback } from 'react';

import dummyData from '../../../../../../data/dummyData.json';
import { CityDataType } from '../../../../../static/types/cityDataType';
import cityNameIndexHash from '../../../../../utils/cityNameIndexHash';
import { useSearchModeState } from '../../../Provider/hooks/useSearchModeState';

const data: CityDataType[] = dummyData;

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      padding: theme.spacing.sm,
    },
    visibility: 'visible',
  },
}));

const SearchControlPanel: FC = () => {
  const { classes } = useStyles();
  const { setSearching, sourceCityName, setTargetCityNames } =
    useSearchModeState();

  const onSearch = useCallback(() => {
    setSearching(true);
    if (sourceCityName !== undefined) {
      // undefind to be 0
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
      <Button
        size="md"
        radius="md"
        color="blue"
        disabled={!sourceCityName}
        leftIcon={<IconSearch />}
        onClick={onSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchControlPanel;
