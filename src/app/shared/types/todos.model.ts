export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosWithAuthor extends Todo {
  authorName: string | undefined;
}
