import { Card, Image, Text, createStyles } from '@mantine/core';
import { FC } from 'react';

import { CityDataType } from '../../../static/types/cityDataType';

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
}));

export type CityCardProps = Pick<
  CityDataType,
  'image' | 'cityName' | 'description'
>;

const CityCard: FC<CityCardProps> = (props) => {
  const { classes } = useStyles();
  const { image, cityName, description } = props;
  return (
    <div className={classes.wrapper}>
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
          {description}
        </Text>
      </Card>
    </div>
  );
};

export default CityCard;
