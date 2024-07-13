export interface PostWithAuthor {
  authorName: string | null;
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
