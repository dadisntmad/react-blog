import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';

import { setIsModalOpened } from '../../redux/slices/modalSlice';

import { SignIn, SignUp } from '../../pages';

import { selectModal } from '../../selectors/selectors';

import { FormType } from '../../types/modal';

import close from '../../assets/close.png';

import styles from './AuthModal.module.scss';

export const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isModalOpened, formType } = useSelector(selectModal);

  useEffect(() => {
    if (isModalOpened) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpened]);

  const onCloseModal = () => {
    dispatch(setIsModalOpened(false));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onCloseModal}>
          <img src={close} alt="close-btn" />
        </button>
        {formType === FormType.signin ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};
