import React from 'react';

import { useAppDispatch } from '../../redux/store';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { auth, db } from '../../firebase';

import { setFormType, setIsModalOpened } from '../../redux/slices/modalSlice';
import { setEmail, setFullname, setIsLoading, setPassword } from '../../redux/slices/userSlice';

import { FormType } from '../../types/modal';
import { selectUser } from '../../selectors/selectors';

import styles from './SignUp.module.scss';

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();

  const { fullName, email, password, isLoading } = useSelector(selectUser);

  const isValid = fullName && email && password;

  const onNavigateToSignIn = () => {
    dispatch(setFormType(FormType.signin));
  };

  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFullname(e.target.value));
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  };

  const signUp = () => {
    dispatch(setIsLoading(true));

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        const uid = userCred.user?.uid;

        const data = {
          uid,
          fullName,
          email,
        };

        await setDoc(doc(db, 'users', uid), data);

        dispatch(setIsLoading(false));
        dispatch(setIsModalOpened(false));
        dispatch(setFullname(''));
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
        <input type="text" placeholder="Full Name" value={fullName} onChange={onFullNameChange} />
      </div>
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
      <button className={styles.signUpButton} onClick={signUp} disabled={!isValid || isLoading}>
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </button>
      <div className={styles.navigation}>
        Already have an account? <span onClick={onNavigateToSignIn}>Sign In</span>
      </div>
    </div>
  );
};
