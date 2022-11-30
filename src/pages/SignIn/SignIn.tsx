import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { setFormType, setIsModalOpened } from '../../redux/slices/modalSlice';
import { setEmail, setIsLoading, setPassword } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/store';
import { selectUser } from '../../selectors/selectors';
import { FormType } from '../../types/modal';
import { auth } from '../../firebase';

import styles from './SignIn.module.scss';

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();

  const { email, password, isLoading } = useSelector(selectUser);

  const isValid = email && password;

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const onNavigateToSignUp = () => {
    dispatch(setFormType(FormType.signup));
  };

  const signIn = () => {
    dispatch(setIsLoading(true));

    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const uid = userCred.user?.uid;
        console.log(`${uid} is signed in`);

        dispatch(setIsLoading(false));
        dispatch(setIsModalOpened(false));
        dispatch(setEmail(''));
        dispatch(setPassword(''));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.inputContainer}>
        <input type="text" placeholder="Email" value={email} onChange={onEmailChange} />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button className={styles.signInButton} onClick={signIn} disabled={!isValid || isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
      <div className={styles.navigation}>
        Don't have an account? <span onClick={onNavigateToSignUp}>Sign Up</span>
      </div>
    </div>
  );
};
