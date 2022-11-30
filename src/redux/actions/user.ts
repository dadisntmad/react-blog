import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser } from '../../utils/firestoreMethods';
import { setUser } from '../slices/userSlice';

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async (uid: string, thunkAPI) => {
    try {
      const user = await getCurrentUser(uid);
      return thunkAPI.dispatch(
        setUser({
          fullName: user?.fullName,
          email: user?.email,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  },
);
