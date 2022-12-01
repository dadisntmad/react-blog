import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, PostSliceState } from '../../types/post';

const initialState: PostSliceState = {
  isPostLoading: false,
  posts: [],
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
  },
});

export const { setPosts, setIsPostLoading } = postSlice.actions;

export default postSlice.reducer;
