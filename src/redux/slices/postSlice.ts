import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostSliceState } from '../../types/post';

const initialState: PostSliceState = {
  isPostLoading: false,
  posts: [],
  isEditingMode: false,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts(state, action: PayloadAction<Post[]>) {
      state.isPostLoading = false;
      state.posts = action.payload;
    },
    setIsPostLoading(state) {
      state.isPostLoading = true;
    },
    setIsEditingMode(state, action: PayloadAction<boolean>) {
      state.isEditingMode = action.payload;
    },
  },
});

export const { setPosts, setIsPostLoading, setIsEditingMode } = postSlice.actions;

export default postSlice.reducer;
