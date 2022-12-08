import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { auth } from '../../firebase';

import { fetchAllPosts, fetchUserPosts } from '../../redux/actions/post';
import { setIsPostLoading } from '../../redux/slices/postSlice';

import { PostsLoader, Posts, FilterModal } from '../../components';

import { selectPost, selectUser } from '../../selectors/selectors';

import filter from '../../assets/filter.png';

import styles from './Home.module.scss';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState(false);

  const { posts, isPostLoading } = useSelector(selectPost);
  const { isLoggedIn } = useSelector(selectUser);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(setIsPostLoading());

    if (isLoggedIn) {
      dispatch(fetchUserPosts(String(currentUser)));
    } else {
      dispatch(fetchAllPosts());
    }
  }, [currentUser, isLoggedIn]);

  const onMakeVisible = () => {
    setIsVisible(!isVisible);
  };

  const onCloseModal = () => {
    setIsVisible(false);
  };

  return (
    <div className={styles.root}>
      {isLoggedIn && (
        <div className={styles.settings} onClick={onMakeVisible}>
          <span>Filter</span> <img src={filter} alt="filter" />
        </div>
      )}
      {isVisible && <FilterModal onCloseModal={onCloseModal} />}
      <div className={styles.posts}>
        {isPostLoading
          ? [...Array(4)].map((_, index) => <PostsLoader key={index} />)
          : posts &&
            posts.map((post) => (
              <Posts
                key={post.postId}
                isEditable={isLoggedIn && post.uid === currentUser}
                {...post}
              />
            ))}
      </div>
    </div>
  );
};
