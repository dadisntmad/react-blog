import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import { Post as PostType } from '../../types/post';
import ReactMarkdown from 'react-markdown';

import back from '../../assets/back.png';

import styles from './Post.module.scss';

export const Post: React.FC = () => {
  const [post, setPost] = useState<PostType>();

  const { postId } = useParams();

  const getPostById = async (postId: string) => {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPost({
        uid: docSnap.data().uid,
        postId: docSnap.data().postId,
        imageUrl: docSnap.data().imageUrl,
        title: docSnap.data().title,
        text: docSnap.data().text,
        fullName: docSnap.data().fullName,
        datePublished: docSnap.data().datePublished?.toDate(),
        views: docSnap.data().views,
      });
      await updateDoc(docRef, {
        views: increment(1),
      });
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    getPostById(String(postId));
  }, [postId]);

  return (
    <>
      <Link className={styles.backButton} to="/">
        <img src={back} alt="back-button" />
      </Link>
      <div className={styles.post} key={post?.postId}>
        <h1>{post?.title}</h1>
        <div>
          <ReactMarkdown children={String(post?.text)} />
        </div>
      </div>
    </>
  );
};
