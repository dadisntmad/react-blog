import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PostsLoader } from '../../components/Loaders/PostsLoader/PostsLoader';
import { Posts } from '../../components/Posts/Posts';
import { auth } from '../../firebase';
import { fetchUserPosts } from '../../redux/actions/post';
import { setIsPostLoading } from '../../redux/slices/postSlice';
import { useAppDispatch } from '../../redux/store';
import { selectPost, selectUser } from '../../selectors/selectors';
import { FilterModal } from '../../components/FilterModal/FilterModal';

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
    dispatch(fetchUserPosts(String(currentUser)));
  }, [currentUser]);

  const onMakeVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.root}>
      <div className={styles.settings} onClick={onMakeVisible}>
        <span>Filter</span> <img src={filter} alt="filter" />
      </div>
      {isVisible && <FilterModal />}
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
