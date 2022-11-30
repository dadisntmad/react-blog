import React from 'react';

import styles from './Posts.module.scss';

type PostsProps = {
  imageUrl: string;
  title: string;
  text: string;
  fullName: string;
  views: number;
  datePublished: string;
};

export const Posts: React.FC<PostsProps> = ({
  imageUrl,
  title,
  text,
  fullName,
  views,
  datePublished,
}) => {
  return (
    <div className={styles.post}>
      <div className={styles.image}>
        <img src={imageUrl} alt="user-post" />
      </div>
      <div className={styles.footer}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className={styles.info}>
          <p>{fullName}</p>
        </div>
        <div className={styles.date}>
          <p>{datePublished}</p>
          <p className={styles.views}>
            <span>{views}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="grey">
              <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
};
