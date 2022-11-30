export type UserSliceState = {
  fullName: string;
  email: string;
  password: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  user: User;
};

export type User = {
  fullName: string;
  email: string;
};
