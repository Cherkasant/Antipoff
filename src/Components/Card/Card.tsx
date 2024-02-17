import React, { FC } from 'react';
import styles from './Card.module.css';
import { CardType } from '../../constants/@types';
import { Like } from '../../Assets/Like/Like';
import { useNavigate } from 'react-router';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setLikedUsers } from '../../Redux/Reducers/dataReducer';
import userSelectors from '../../Redux/Selectors/userSelectors';

type CardProps = {
  card: CardType;
};

const Card: FC<CardProps> = ({ card }) => {
  const likedUsers = useSelector(userSelectors.getLikedUsers);
  const isLiked = likedUsers.findIndex((user: CardType) => user.id === card.id) > -1;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCardClick = () => {
    navigate(`/profile/${card.id}`);
  };

  const onLikeClick = () => {
    dispatch(setLikedUsers(card));
  };

  return (
    <div className={styles.container}>
      <img src={card?.avatar} alt="no photo" className={styles.avatar} onClick={onCardClick} />
      <div className={styles.name}>
        {card?.first_name} {card?.last_name}
      </div>
      <div className={classnames(styles.like, { [styles.clicked]: isLiked })} onClick={onLikeClick}>
        <Like />
      </div>
    </div>
  );
};

export default Card;
