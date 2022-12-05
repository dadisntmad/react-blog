import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PostsLoader } from '../../components/Loaders/PostsLoader/PostsLoader';
import { Posts } from '../../components/Posts/Posts';
import { auth } from '../../firebase';
import { fetchUserPosts } from '../../redux/actions/post';
import { setIsPostLoading } from '../../redux/slices/postSlice';
import { useAppDispatch } from '../../redux/store';
import { selectPost, selectUser } from '../../selectors/selectors';

import styles from './Home.module.scss';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts, isPostLoading } = useSelector(selectPost);
  const { isLoggedIn } = useSelector(selectUser);

  const currentUser = auth.currentUser?.uid;

  useEffect(() => {
    dispatch(setIsPostLoading());
    dispatch(fetchUserPosts(String(currentUser)));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.posts}>
        {isPostLoading ? (
          <PostsLoader />
        ) : (
          posts &&
          posts.map((post) => (
            <Posts
              key={post.postId}
              isEditable={isLoggedIn && post.uid === currentUser}
              {...post}
            />
          ))
        )}
      </div>
    </div>
  );
};
