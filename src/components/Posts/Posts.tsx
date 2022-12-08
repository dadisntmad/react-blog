import React from 'react';

import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/store';
import { doc, deleteDoc } from 'firebase/firestore';
import moment from 'moment';

import { setIsEditingMode } from '../../redux/slices/postSlice';

import { db } from '../../firebase';

import { DatePublished } from '../../types/post';

import edit from '../../assets/pencil.png';
import deleteIcon from '../../assets/delete.png';

import styles from './Posts.module.scss';

type PostsProps = {
  postId: string;
  imageUrl: string;
  title: string;
  text: string;
  fullName: string;
  views: number;
  datePublished: DatePublished;
  isEditable: boolean;
};

export const Posts: React.FC<PostsProps> = ({
  postId,
  imageUrl,
  title,
  text,
  fullName,
  views,
  datePublished,
  isEditable,
}) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const onEditPost = async () => {
    dispatch(setIsEditingMode(true));

    navigate(`/post/${postId}/edit`);
  };

  const onDeletePost = async () => {
    await deleteDoc(doc(db, 'posts', postId));
  };

  return (
    <div className={styles.post} ref={ref}>
      {isEditable && (
        <div className={styles.buttons}>
          <img src={edit} width={20} alt="edit-button" onClick={onEditPost} />
          <img src={deleteIcon} width={20} alt="delete-button" onClick={onDeletePost} />
        </div>
      )}
      <Link to={`/post/${postId}`}>
        {inView ? (
          <div className={styles.image}>
            <img src={imageUrl} alt="user-post" />
          </div>
        ) : (
          <div className={styles.lazy} />
        )}
      </Link>
      <div className={styles.footer}>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className={styles.info}>
          <p>{fullName}</p>
        </div>
        <div className={styles.date}>
          <p>{moment(datePublished).format('MMMM Do YYYY')}</p>
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
