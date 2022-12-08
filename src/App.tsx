import React, { useEffect } from 'react';

import { useAppDispatch } from './redux/store';
import { Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

import { setIsLoggedIn } from './redux/slices/userSlice';

import { Header } from './components';
import { Home, CreatePost, Post } from './pages';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setIsLoggedIn(true));
      } else {
        dispatch(setIsLoggedIn(false));
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<CreatePost />} />
        <Route path="/post/:id/edit" element={<CreatePost />} />
        <Route path="/post/:postId" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
