import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';

import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectUser } from '../../selectors/selectors';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { fetchCurrentUser } from '../../redux/actions/user';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { serverTimestamp } from 'firebase/firestore';

import upload from '../../assets/upload.png';

import styles from './CreatePost.module.scss';

export const CreatePost: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState<File>();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | any>();

  const { user } = useSelector(selectUser);

  const fileRef = useRef<HTMLInputElement>(null);

  const fullName = user.fullName;

  const currentUser = auth.currentUser?.uid;

  const isValid = file && title && text;

  const postId = uuidv4();

  const onSelectImage = () => {
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
            onCreatePost(downloadURL);
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

  useEffect(() => {
    dispatch(fetchCurrentUser(String(currentUser)));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.preview}>
        {file ? (
          <img className={styles.previewImage} src={selectedImage} alt="selected-file" />
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
        <button disabled={!isValid} onClick={onSelectImage}>
          Post
        </button>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
};
