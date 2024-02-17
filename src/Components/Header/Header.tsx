import React, { FC, ReactElement } from 'react';
import styles from './Header.module.css';
import { useDispatch } from 'react-redux';
import { setLogoutUser } from '../../Redux/Reducers/dataReducer';
import { useNavigate } from 'react-router';
import { PathNames } from '../../Pages/Router/Router';
import { Logout } from '../../Assets/Logout/Logout';
import classnames from 'classnames';

type HeaderProps = {
  children: ReactElement;
  style?: string;
};

const Header: FC<HeaderProps> = ({ children, style }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogOutClick = () => {
    dispatch(setLogoutUser());
    navigate(PathNames.SignUp);
  };

  return (
    <div className={classnames(styles.container, style)}>
      <div className={styles.logout} onClick={onLogOutClick}>
        <Logout />
      </div>
      <div className={styles.exitBtn} onClick={onLogOutClick}>
        {'Выход'}
      </div>
      {children}
    </div>
  );
};

export default Header;
