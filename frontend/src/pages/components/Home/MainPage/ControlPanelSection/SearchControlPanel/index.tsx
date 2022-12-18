import { Button, createStyles, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { FC, useMemo, useEffect } from 'react';

import cityData from '../../../../../../data/prodCityData.json';
import undefinedData from '../../../../../../data/undefinedData.json';
import { CityDataType } from '../../../../../static/types/cityDataType';
import cityNameIndexHash from '../../../../../utils/cityNameIndexHash';
import { useSearchModeState } from '../../../Provider/hooks/useSearchModeState';
import CityCard from '../../../shared/CityCard';

const dataObject: any = cityData;
const data: CityDataType[] = dataObject;
const undefinedItem: CityDataType = undefinedData;

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      padding: theme.spacing.sm,
    },
    visibility: 'visible',
    zIndex: 100,
  },
  selectedCityWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.md,
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.sm,
  },
}));

const SearchControlPanel: FC = () => {
  const { classes } = useStyles();
  const { sourceCountryPrefectureName, sourceCityName, setTargetCityNames } =
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
  }, [sourceCityName, setTargetCityNames]);

  return (
    <div className={classes.root}>
      {sourceCityName ? (
        <div className={classes.selectedCityWrapper}>
          <Title order={1} color="cyan">
            Selected City
          </Title>
          <CityCard {...sourceCityInfo} />
          <Button
            size="md"
            radius="md"
            color="cyan"
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
      ) : sourceCountryPrefectureName ? (
        <div className={classes.textWrapper}>
          <Title order={3} color="cyan">
            Selected
            <br />
            Country or Prefecture
          </Title>

          <Title order={1}>{sourceCountryPrefectureName}</Title>
        </div>
      ) : (
        <Title order={3} color="cyan">
          Select
          <br />
          Country or Prefecture
        </Title>
      )}
    </div>
  );
};

export default SearchControlPanel;
