import React from 'react';
import { setFormType } from '../../redux/slices/modalSlice';
import { useAppDispatch } from '../../redux/store';
import { FormType } from '../../types/modal';

import styles from './SignUp.module.scss';

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();

  const onNavigateToSignIn = () => {
    dispatch(setFormType(FormType.signin));
  };

  return (
    <div className={styles.root}>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Full Name" />
      </div>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Email" />
      </div>
      <div className={styles.inputContainer}>
        <input type="password" placeholder="Password" />
      </div>
      <button className={styles.signUpButton}>Sign Up</button>
      <div className={styles.navigation}>
        Already have an account? <span onClick={onNavigateToSignIn}>Sign In</span>
      </div>
    </div>
  );
};
