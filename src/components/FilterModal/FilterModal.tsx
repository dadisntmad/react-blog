import React from 'react';

import { useAppDispatch } from '../../redux/store';
import { auth } from '../../firebase';

import { fetchAllPosts, fetchUserPosts } from '../../redux/actions/post';

import user from '../../assets/user.png';
import users from '../../assets/users.png';

import styles from './FilterModal.module.scss';

type FilterModalProps = {
  onCloseModal: () => void;
};

export const FilterModal: React.FC<FilterModalProps> = ({ onCloseModal }) => {
  const dispatch = useAppDispatch();

  const currentUser = auth.currentUser?.uid;

  const getMyPosts = () => {
    dispatch(fetchUserPosts(String(currentUser)));
    onCloseModal();
  };

  const getAllPosts = () => {
    dispatch(fetchAllPosts());
    onCloseModal();
  };

  return (
    <div className={styles.root}>
      <div className={styles.item} onClick={getMyPosts}>
        <span>My posts</span>
        <img src={user} alt="my-posts" />
      </div>
      <div className={styles.item} onClick={getAllPosts}>
        <span>All posts</span>
        <img src={users} alt="all-posts" />
      </div>
    </div>
  );
};
