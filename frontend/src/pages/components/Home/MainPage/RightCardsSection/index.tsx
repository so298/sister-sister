import { createStyles } from '@mantine/core';
import { FC } from 'react';

import { CityItem } from '../../../../static/types/cityDataType';

import JsonData from './contents/content.json';
import RightCard, { RightCardProps } from './elements/RightCard';

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
  const Items: CityItem[] = JsonData;

  const { classes } = useStyles();
  const cardItems: RightCardProps[] = [
    {
      image: '/youjinbou.jpeg',
      cityName: 'Youjinbou Ramen',
      description: 'おいしい',
    },
    {
      image:
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      cityName: 'Norway Fjord Adventures',
      description:
        'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
    },
    {
      image:
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',

      cityName: 'Norway Fjord Adventures',
      description:
        'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
    },
    {
      image:
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',

      cityName: 'Norway Fjord Adventures',
      description:
        'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
    },
  ];
  return (
    <div className={classes.root}>
      {[...Items, ...cardItems].map((cardItem, i) => (
        <RightCard {...cardItem} key={i} />
      ))}
    </div>
  );
};

export default RightCardSection;
