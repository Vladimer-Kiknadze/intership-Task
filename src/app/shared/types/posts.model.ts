export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithAuthor extends Post {
  authorName: string | undefined;
}
