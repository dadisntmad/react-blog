import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { serverTimestamp } from 'firebase/firestore';
import SimpleMDE from 'react-simplemde-editor';

import { fetchCurrentUser } from '../../redux/actions/user';
import { setIsEditingMode } from '../../redux/slices/postSlice';

import { selectPost, selectUser } from '../../selectors/selectors';

import upload from '../../assets/upload.png';

import 'easymde/dist/easymde.min.css';
import styles from './CreatePost.module.scss';

export const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | any>();

  const { user } = useSelector(selectUser);
  const { isEditingMode } = useSelector(selectPost);

  const fileRef = useRef<HTMLInputElement>(null);

  const fullName = user.fullName;

  const currentUser = auth.currentUser?.uid;

  const isValid = file && title && text;

  const postId = uuidv4();

  const onSubmit = () => {
    if (file) {
      const storageRef = ref(storage, `previews/${currentUser}/${Math.random().toString(36)}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            isEditingMode ? onSaveEditedPost(downloadURL) : onCreatePost(downloadURL);
          });
        },
      );
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
    setSelectedImage(URL.createObjectURL(e.target.files![0]));
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onTextChange = useCallback((value: string) => {
    setText(value);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      placeholder: "What's on your mind?",
    }),
    [],
  );

  const onCreatePost = async (fileUrl: string) => {
    const data = {
      uid: currentUser,
      postId,
      imageUrl: fileUrl,
      title,
      text,
      fullName,
      views: 0,
      datePublished: serverTimestamp(),
    };

    await setDoc(doc(db, 'posts', postId), data);

    navigate('/');
    setTitle('');
    setText('');
  };

  const onSaveEditedPost = async (fileUrl: string) => {
    const docRef = doc(db, 'posts', String(id));

    const data = {
      imageUrl: fileUrl,
      title,
      text,
    };

    await updateDoc(docRef, data);

    navigate(`/`);

    dispatch(setIsEditingMode(false));
  };

  const getDocById = async () => {
    const docRef = doc(db, 'posts', String(id));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFile(docSnap.data().imageUrl);
      setSelectedImage(docSnap.data().imageUrl);
      setTitle(docSnap.data().title);
      setText(docSnap.data().text);
    } else {
      console.log('No such document!');
    }
  };

  const onDeletePreview = () => {
    setFile(null);
    setSelectedImage('');
  };

  const onCancel = () => {
    dispatch(setIsEditingMode(false));
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchCurrentUser(String(currentUser)));
  }, [currentUser]);

  useEffect(() => {
    if (id) {
      getDocById();
    }
  }, [id]);

  return (
    <div className={styles.root}>
      <div className={styles.preview}>
        {file ? (
          <div className={styles.previewImageContainer}>
            <button onClick={onDeletePreview}>Delete preview</button>
            <img className={styles.previewImage} src={selectedImage} alt="selected-file" />
          </div>
        ) : (
          <button onClick={() => fileRef.current?.click()}>
            <img src={upload} alt="upload-button" />
          </button>
        )}
        <input type="file" hidden ref={fileRef} onChange={onFileChange} />
      </div>
      <input
        className={styles.inputTitle}
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={onTitleChange}
      />
      <SimpleMDE value={text} onChange={onTextChange} options={options} />
      <div className={styles.buttons}>
        <button disabled={!isValid} onClick={onSubmit}>
          {isEditingMode ? 'Save' : 'Post'}
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
