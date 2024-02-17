import React, { useCallback, useEffect, useState } from 'react';
import styles from './Home.module.css';
import CardList from '../../Components/CardList';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../Redux/Reducers/dataReducer';
import userSelectors from '../../Redux/Selectors/userSelectors';
import { PER_PAGE } from '../../constants/consts';
import { SlArrowLeft } from 'react-icons/sl';
import { SlArrowRight } from 'react-icons/sl';
import classnames from 'classnames';
import Header from '../../Components/Header/Header';

const getTotalPageCount = (totalPages: number): number => Math.ceil(totalPages / PER_PAGE);

const Home = () => {
  const isLoggedIn = useSelector(userSelectors.getLoggedIn);
  const users = useSelector(userSelectors.getUsersList);
  const totalPages = useSelector(userSelectors.getTotalPages);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUsers(currentPage));
    }
  }, [currentPage, isLoggedIn]);

  const handleNextPage = useCallback(() => {
    const current = currentPage;
    const next = current + 1;
    const total = users ? getTotalPageCount(totalPages) : current;
    setCurrentPage(next <= total ? next : current);
  }, [currentPage, users]);

  const handlePrevPage = useCallback(() => {
    const current = currentPage;
    const prev = current - 1;
    setCurrentPage(prev > 0 ? prev : current);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <Header>
        <div className={styles.header}>
          <div className={styles.title}>{'Наша команда'}</div>
          <div className={styles.description}>
            {
              'Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций. '
            }
          </div>
        </div>
      </Header>
      <div className={styles.main}>
        {users && <CardList cards={users} />}
        <div className={styles.pageBtn}>
          <div
            className={classnames(styles.showMore, { [styles.disabled]: currentPage === 1 })}
            onClick={handlePrevPage}>
            <SlArrowLeft />
          </div>
          <div
            className={classnames(styles.showMore, {
              [styles.disabled]: currentPage === getTotalPageCount(totalPages)
            })}
            onClick={handleNextPage}>
            <SlArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
