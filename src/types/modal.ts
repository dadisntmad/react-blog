export type ModalSliceState = {
  isModalOpened: boolean;
  formType: string;
};

export enum FormType {
  signin = 'SIGNIN',
  signup = 'SIGNUP',
}
