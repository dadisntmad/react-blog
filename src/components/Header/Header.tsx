import React from 'react';
import { AuthModal } from '../AuthModal/AuthModal';
import { useSelector } from 'react-redux';
import { selectModal, selectUser } from '../../selectors/selectors';
import { useAppDispatch } from '../../redux/store';
import { setIsModalOpened } from '../../redux/slices/modalSlice';

import pencil from '../../assets/pencil.png';
import sun from '../../assets/sun.png';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useSelector(selectUser);
  const { isModalOpened } = useSelector(selectModal);

  const onOpenModal = () => {
    dispatch(setIsModalOpened(true));
  };

  return (
    <>
      {isModalOpened && <AuthModal />}
      <header className={styles.header}>
        <div className={styles.content}>
          {isLoggedIn ? (
            <>
              <button className={styles.newPostButton}>
                <p>New post</p> <img src={pencil} alt="pencil" />
              </button>
              <button className={styles.actionButton}>Sign Out</button>
            </>
          ) : (
            <button className={styles.actionButton} onClick={onOpenModal}>
              Sign In
            </button>
          )}
          <img src={sun} alt="theme-changing-icon" />
        </div>
      </header>
    </>
  );
};
