import React, { FC } from 'react';
import { CardListType } from '../../constants/@types';
import styles from './CardList.module.css';
import Card from '../Card';

type CardListProps = {
  cards: CardListType | null;
};

const CardList: FC<CardListProps> = ({ cards }) => {
  return cards?.length ? (
    <div className={styles.container}>
      {cards.map((card) => {
        return <Card key={card.id} card={card} />;
      })}
    </div>
  ) : (
    <div>{'No cards yet...'}</div>
  );
};

export default CardList;
