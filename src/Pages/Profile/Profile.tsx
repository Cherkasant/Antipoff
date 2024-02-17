import React, { useEffect } from 'react';
import styles from './Profile.module.css';
import { PhoneIcon } from '../../Assets/PhoneIcon/PhoneIcon';
import { Letter } from '../../Assets/Letter/Letter';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser } from '../../Redux/Reducers/dataReducer';
import userSelectors from '../../Redux/Selectors/userSelectors';
import Header from '../../Components/Header/Header';
import { PathNames } from '../Router/Router';
import { BackIcon } from '../../Assets/BackIcon/BackIcon';

const Profile = () => {
  const params = useParams();
  const { id } = params;

  const dispatch = useDispatch();
  const data = useSelector(userSelectors.getSingleUser);

  useEffect(() => {
    if (id) {
      dispatch(getSingleUser(+id));
    }
  }, [id]);

  const navigate = useNavigate();

  const onBackClick = () => {
    navigate(PathNames.Home);
  };

  return (
    <div className={styles.container}>
      <Header style={styles.headerMobile}>
        <div className={styles.header}>
          <div className={styles.firstBlock}>
            <div className={styles.backBtn} onClick={onBackClick}>
              {'Назад'}
            </div>
            <div className={styles.backIcon} onClick={onBackClick}>
              <BackIcon />
            </div>
            <div className={styles.info}>
              <img src={data?.avatar} alt="no photo" className={styles.avatar} />
              <div className={styles.nameBlock}>
                <div className={styles.name}>
                  {data?.first_name} {data?.last_name}
                </div>
                <div className={styles.prof}>{'Партнер'}</div>
              </div>
            </div>
          </div>
        </div>
      </Header>
      <div className={styles.main}>
        <div className={styles.mainInfo}>
          <div className={styles.description}>
            {'Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.\n' +
              '\n' +
              'В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".\n' +
              '\n' +
              'Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.'}
          </div>
          <div className={styles.mediaBlock}>
            <div className={styles.phoneNumber}>
              <PhoneIcon />
              <div className={styles.number}>{'+7 (954) 333-44-55'}</div>
            </div>
            <div className={styles.emailBlock}>
              <Letter />
              <div className={styles.email}>{data?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
