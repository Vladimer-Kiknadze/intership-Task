export interface PostWithAuthor {
  authorName: string | undefined;
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
