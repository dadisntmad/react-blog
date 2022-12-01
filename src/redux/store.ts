import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import modalSlice from './slices/modalSlice';
import postSlice from './slices/postSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    post: postSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
