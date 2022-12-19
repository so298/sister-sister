import { createStyles, Title } from '@mantine/core';
import { FC, useMemo } from 'react';

import cityData from '../../../../../data/prodCityData.json';
import undefinedData from '../../../../../data/undefinedData.json';
import { CityDataType } from '../../../../static/types/cityDataType';
import cityNameIndexHash from '../../../../utils/cityNameIndexHash';
import countryPrefectureNameIndexHash from '../../../../utils/countryPrefectureNameIndexHash';
import { useSearchModeState } from '../../Provider/hooks/useSearchModeState';
import CityCard, { CityCardProps } from '../../shared/CityCard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataObject: any = cityData;
const data: CityDataType[] = dataObject;

const useStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
}));

const RightCardSection: FC = () => {
  const { sourceCountryPrefectureName, sourceCityName, targetCityNames } =
    useSearchModeState();
  const { classes } = useStyles();

  const cardItems: CityCardProps[] = useMemo(() => {
    const items: CityCardProps[] = [];
    console.log(sourceCountryPrefectureName);
    if (sourceCountryPrefectureName && targetCityNames) {
      targetCityNames?.forEach((d) => {
        const undefinedItem: CityDataType = JSON.parse(
          JSON.stringify(undefinedData),
        );
        undefinedItem.cityName = d;
        const targetCityIndex = cityNameIndexHash.get(d);
        if (targetCityIndex !== undefined) {
          const targetCityInfo: CityDataType = data[targetCityIndex];
          items.push(targetCityInfo);
        } else {
          items.push(undefinedItem);
        }
      });
    } else if (sourceCountryPrefectureName && !targetCityNames) {
      const inCountryPrefectureCityIndexList =
        countryPrefectureNameIndexHash.get(sourceCountryPrefectureName);
      if (inCountryPrefectureCityIndexList !== undefined) {
        inCountryPrefectureCityIndexList.forEach((i) => {
          const inCountryPrefectureCity = data[i];
          items.push(inCountryPrefectureCity);
        });
      }
    }
    {
      return items;
    }
  }, [sourceCountryPrefectureName, targetCityNames]);

  return (
    <div className={classes.root}>
      {targetCityNames && (
        <>
          <div className={classes.textWrapper}>
            <Title color="cyan">Sister Cities of </Title>
            <Title> {sourceCityName}</Title>
          </div>
          {[...cardItems].map((cardItem, i) => (
            <CityCard {...cardItem} key={i} />
          ))}
        </>
      )}
      {!targetCityNames && (
        <>
          <div className={classes.textWrapper}>
            <Title color="cyan">Cities in </Title>
            <Title>{sourceCountryPrefectureName}</Title>
          </div>
          {[...cardItems].map((cardItem, i) => (
            <CityCard {...cardItem} key={i} />
          ))}
        </>
      )}
    </div>
  );
};

export default RightCardSection;
