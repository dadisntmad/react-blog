import React from 'react';
import { setFormType } from '../../redux/slices/modalSlice';
import { useAppDispatch } from '../../redux/store';
import { FormType } from '../../types/modal';

import styles from './SignIn.module.scss';

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const onNavigateToSignUp = () => {
    dispatch(setFormType(FormType.signup));
  };

  return (
    <div className={styles.root}>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Email" />
      </div>
      <div className={styles.inputContainer}>
        <input type="password" placeholder="Password" />
      </div>
      <button className={styles.signInButton}>Sign In</button>
      <div className={styles.navigation}>
        Don't have an account? <span onClick={onNavigateToSignUp}>Sign Up</span>
      </div>
    </div>
  );
};
