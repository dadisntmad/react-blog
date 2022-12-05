export type PostSliceState = {
  isPostLoading: boolean;
  posts: Post[];
  isEditingMode: boolean;
};

export type Post = {
  uid: string;
  postId: string;
  imageUrl: string;
  title: string;
  text: string;
  fullName: string;
  datePublished: DatePublished;
  views: number;
};

export type DatePublished = {
  seconds: number;
  nanoseconds: number;
};
