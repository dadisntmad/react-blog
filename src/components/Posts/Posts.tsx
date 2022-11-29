import React from 'react';

import styles from './Posts.module.scss';

type PostsProps = {
  imageUrl: string;
  title: string;
  text: string;
};

export const Posts: React.FC<PostsProps> = ({ imageUrl, title, text }) => {
  return (
    <div className={styles.post}>
      <div className={styles.image}>
        <img src={imageUrl} alt="user-post" />
      </div>
      <div className={styles.footer}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div>username</div>
      </div>
    </div>
  );
};
