import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import { setIsModalOpened } from '../../redux/slices/modalSlice';

import { AuthModal } from '../AuthModal/AuthModal';

import { selectModal, selectUser } from '../../selectors/selectors';

import pencil from '../../assets/pencil.png';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoggedIn } = useSelector(selectUser);
  const { isModalOpened } = useSelector(selectModal);

  const onOpenModal = () => {
    dispatch(setIsModalOpened(true));
  };

  const logout = () => {
    signOut(auth);
  };

  return (
    <>
      {isModalOpened && <AuthModal />}
      <header className={styles.header}>
        <div className={styles.content}>
          {isLoggedIn ? (
            <>
              <Link to="/new-post" className={styles.newPostButton}>
                <p>New post</p> <img src={pencil} alt="pencil" />
              </Link>
              <button className={styles.actionButton} onClick={logout}>
                Sign Out
              </button>
            </>
          ) : (
            <button className={styles.actionButton} onClick={onOpenModal}>
              Sign In
            </button>
          )}
        </div>
      </header>
    </>
  );
};
