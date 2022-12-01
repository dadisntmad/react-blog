import { RootState } from '../redux/store';

// user slice
export const selectUser = (state: RootState) => state.user;

// modal slice
export const selectModal = (state: RootState) => state.modal;

// post slice
export const selectPost = (state: RootState) => state.post;
