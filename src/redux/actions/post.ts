import { createAsyncThunk } from '@reduxjs/toolkit';
import { query, collection, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { setPosts } from '../slices/postSlice';

export const fetchUserPosts = createAsyncThunk(
  'post/fetchUserPosts',
  async (uid: string, thunkAPI) => {
    try {
      const q = query(
        collection(db, 'posts'),
        where('uid', '==', uid),
        orderBy('datePublished', 'desc'),
      );
      onSnapshot(q, (querySnapshot) => {
        thunkAPI.dispatch(
          setPosts(
            querySnapshot.docs.map((doc) => ({
              uid: doc.data().uid,
              postId: doc.data().postId,
              imageUrl: doc.data().imageUrl,
              title: doc.data().title,
              text: doc.data().text,
              fullName: doc.data().fullName,
              datePublished: doc.data().datePublished?.toDate(),
              views: doc.data().views,
            })),
          ),
        );
      });
    } catch (error) {
      console.log(error);
    }
  },
);
