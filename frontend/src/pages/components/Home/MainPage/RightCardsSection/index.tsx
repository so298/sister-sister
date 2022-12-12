import { createStyles, Flex } from '@mantine/core';
import { FC } from 'react';

import RightCard, { RightCardProps } from './elements/RightCard';

const useStyles = createStyles((theme) => ({
  root: { padding: 'md', width: '30%' },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 90,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}));

const RightCardSection: FC = () => {
  const { classes } = useStyles();
  const cardItems: RightCardProps[] = [
    {
      imgSrc: '/youjinbou.jpeg',
      alt: 'Youjinbou',
      cityName: 'Youjinbou Ramen',
      description: 'おいしい',
    },
    {
      imgSrc:
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      alt: 'Norway',
      cityName: 'Norway Fjord Adventures',
      description:
        'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
    },
    {
      imgSrc:
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      alt: 'Norway',
      cityName: 'Norway Fjord Adventures',
      description:
        'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
    },
    {
      imgSrc:
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      alt: 'Norway',
      cityName: 'Norway Fjord Adventures',
      description:
        'With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around the fjords of Norway',
    },
  ];
  return (
    <Flex gap="md" direction="column" p="md" className={classes.root}>
      {cardItems.map((cardItem, i) => (
        <RightCard {...cardItem} key={i} />
      ))}
    </Flex>
  );
};

export default RightCardSection;
