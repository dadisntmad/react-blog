import React from 'react';

import pencil from '../../assets/pencil.png';
import sun from '../../assets/sun.png';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const isLoggedIn = false;

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        {isLoggedIn ? (
          <button className={styles.newPostButton}>
            <p>New post</p> <img src={pencil} alt="pencil" />
          </button>
        ) : (
          <button className={styles.signInButton}>Sign In</button>
        )}
        <img src={sun} alt="theme-changing-icon" />
      </div>
    </header>
  );
};
