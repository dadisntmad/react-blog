import { doc, getDoc } from 'firebase/firestore';
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
