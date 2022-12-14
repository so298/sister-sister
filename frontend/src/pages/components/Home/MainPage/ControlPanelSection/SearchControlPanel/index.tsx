import { Button, createStyles } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { FC, useCallback, useEffect } from 'react';

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
  const {
    searching,
    setSearching,
    sourceCityName,
    targetCityNames,
    setTargetCityNames,
  } = useSearchModeState();

  const onSearch = useCallback(() => {
    setSearching(true);
    if (searching && sourceCityName !== undefined) {
      // undefind to be 0
      const sourceCityIndex = Number(cityNameIndexHash.get(sourceCityName));
      const sourceCityInfo: CityDataType = data[sourceCityIndex];
      setTargetCityNames(sourceCityInfo.sisterCities);
    }
  }, [searching, sourceCityName]);

  // run onSearch again
  useEffect(() => {
    if (searching) onSearch();
  }, [searching, targetCityNames]);

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
