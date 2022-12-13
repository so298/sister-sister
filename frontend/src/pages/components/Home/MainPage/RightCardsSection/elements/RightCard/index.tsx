import { Card, Image, Text, createStyles } from '@mantine/core';
import { FC } from 'react';

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
    //overflow: 'scroll',
    width: '100%',
  },
}));

export type RightCardProps = {
  imgSrc: string;
  alt: string;
  cityName: string;
  description: string;
};

const RightCard: FC<RightCardProps> = (props) => {
  const { classes } = useStyles();
  const { imgSrc, alt, cityName, description } = props;
  return (
    <div className={classes.wrapper}>
      <Card className={classes.item} shadow="sm" radius="md" withBorder>
        <Card.Section>
          <Image src={imgSrc} height={160} alt={alt} />
        </Card.Section>
        <Text pt="xs" pb="xs" weight={500}>
          {cityName}
        </Text>

        <Text size="sm" color="dimmed">
          {description}
        </Text>
      </Card>
    </div>
  );
};

export default RightCard;
