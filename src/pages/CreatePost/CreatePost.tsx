import React, { useState, useCallback, useMemo } from 'react';

import { Link } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import upload from '../../assets/upload.png';

import styles from './CreatePost.module.scss';

export const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const isValid = title && text;

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

  return (
    <div className={styles.root}>
      <div className={styles.preview}>
        <button>
          <img src={upload} alt="upload-button" />
        </button>
        <input type="file" hidden />
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
        <button disabled={!isValid}>Post</button>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
};
