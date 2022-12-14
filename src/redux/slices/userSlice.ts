import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSliceState } from '../../types/user';

const initialState: UserSliceState = {
  fullName: '',
  email: '',
  password: '',
  isLoggedIn: false,
  isLoading: false,
  user: {} as User,
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
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const { setFullname, setEmail, setPassword, setIsLoggedIn, setIsLoading, setUser } =
  userSlice.actions;

export default userSlice.reducer;
