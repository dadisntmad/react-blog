import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSliceState } from '../../types/user';

const initialState: UserSliceState = {
  fullName: '',
  email: '',
  password: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFullname(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setFullname, setEmail, setPassword, setIsLoggedIn } = userSlice.actions;

export default userSlice.reducer;
