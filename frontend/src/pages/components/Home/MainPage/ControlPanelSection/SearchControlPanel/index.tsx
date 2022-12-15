import { Button, createStyles, Card, Text, Image } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { FC, useMemo, useEffect } from 'react';

import dummyData from '../../../../../../data/dummyData.json';
import undefinedData from '../../../../../../data/undefinedData.json';
import { CityDataType } from '../../../../../static/types/cityDataType';
import cityNameIndexHash from '../../../../../utils/cityNameIndexHash';
import { useSearchModeState } from '../../../Provider/hooks/useSearchModeState';

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
  item: {
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    width: '100%',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
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
      <Card className={classes.item} shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Image src={sourceCityInfo.image} height={160} alt={sourceCityName} />
        </Card.Section>
        <Text pt="sm" pb="0" weight={500}>
          {sourceCityName}
        </Text>
        <Text size="sm" color="dimmed">
          {sourceCityInfo.description}
        </Text>
      </Card>
      <Button
        size="md"
        radius="md"
        color="blue"
        disabled={!sourceCityName}
        leftIcon={<IconSearch />}
        // onClick={onSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchControlPanel;
