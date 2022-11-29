import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormType, ModalSliceState } from '../../types/modal';

const initialState: ModalSliceState = {
  isModalOpened: false,
  formType: FormType.signin,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsModalOpened(state, action: PayloadAction<boolean>) {
      state.isModalOpened = action.payload;
    },
    setFormType(state, action: PayloadAction<string>) {
      state.formType = action.payload;
    },
  },
});

export const { setIsModalOpened, setFormType } = modalSlice.actions;

export default modalSlice.reducer;
