import React from 'react';

import user from '../../assets/user.png';
import users from '../../assets/users.png';

import styles from './FilterModal.module.scss';

export const FilterModal: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <span>My posts</span>
        <img src={user} alt="my-posts" />
      </div>
      <div className={styles.item}>
        <span>All posts</span>
        <img src={users} alt="all-posts" />
      </div>
    </div>
  );
};
