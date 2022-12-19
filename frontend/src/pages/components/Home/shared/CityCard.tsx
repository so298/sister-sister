import { Card, Image, Text, createStyles } from '@mantine/core';
import { FC } from 'react';

import { CityDataType } from '../../../static/types/cityDataType';
import { useSearchModeState } from '../Provider/hooks/useSearchModeState';

const useStyles = createStyles((theme) => ({
  item: {
    transition: 'box-shadow 150ms ease, transform 100ms ease',
    width: '100%',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
  wrapper: {
    width: '100%',
  },
  descriptionWrapper: {
    width: '100%',
    maxHeight: '20vh',
    overflow: 'auto',
  },
}));

export type CityCardProps = Pick<
  CityDataType,
  | 'image'
  | 'cityName'
  | 'description'
  | 'country'
  | 'prefecture'
  | 'area'
  | 'population'
  | 'wikiUrl'
>;

const CityCard: FC<CityCardProps> = (props) => {
  const {
    setSourceCountryPrefectureName,
    sourceCityName,
    setSourceCityName,
    setSelectedCard,
    setHoveredCard,
  } = useSearchModeState();
  const { classes } = useStyles();
  const { image, cityName, description, area, population, country } = props;

  const onCityCardChange = (props: CityCardProps): void => {
    const { cityName, country, prefecture } = props;
    if (country === 'Japan') {
      setSourceCountryPrefectureName(prefecture);
    } else {
      setSourceCountryPrefectureName(country);
    }
    setSourceCityName(cityName);
    setSelectedCard(cityName);
    console.log({ cityName });
  };

  const onCityCardHovered = (props: CityCardProps): void => {
    const { cityName } = props;
    if (
      typeof cityName !== 'undefined' &&
      typeof sourceCityName !== 'undefined'
    ) {
      setHoveredCard(cityName);
    }
  };

  const onCityCardLeave = () => {
    setHoveredCard(undefined);
  };

  return (
    <div
      className={classes.wrapper}
      onClick={() => onCityCardChange(props)}
      onMouseOver={() => onCityCardHovered(props)}
      onMouseLeave={() => onCityCardLeave()}
    >
      <Card className={classes.item} shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Image
            src={
              typeof image === undefined || image === '' ? 'noImage.png' : image
            }
            height={160}
            alt={cityName}
          />
        </Card.Section>
        <Text pt="sm" pb="0" weight={500}>
          {cityName}
        </Text>
        <Text size="sm" color="dimmed">
          国 : {country}
        </Text>
        {population == 0 ? (
          <Text size="sm" color="dimmed">
            人口 : No Data
          </Text>
        ) : (
          <Text size="sm" color="dimmed">
            人口 :{' '}
            {Number(
              Number(population?.toPrecision(3)).toFixed(0),
            ).toLocaleString()}{' '}
            人
          </Text>
        )}
        {area == 0 ? (
          <Text size="sm" color="dimmed">
            面積 : No Data
          </Text>
        ) : (
          <Text size="sm" color="dimmed">
            面積 :{' '}
            {Number(Number(area?.toPrecision(3)).toFixed(0)).toLocaleString()}{' '}
            km2
          </Text>
        )}
        <Text size="sm" color="dimmed">
          概要 :
        </Text>
        <div className={classes.descriptionWrapper}>
          <Text size="sm" color="dimmed">
            {description}
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default CityCard;
