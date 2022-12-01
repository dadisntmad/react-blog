import { doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const getCurrentUser = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such document!');
  }
};

export const getUserPosts = (uid: string) => {
  const q = query(collection(db, 'posts'), where('uid', '==', uid));

  const unsub = onSnapshot(q, (querySnapshot) => {
    const result = querySnapshot.docs.map((doc) => doc.data());

    return result;
  });

  return unsub;
};
