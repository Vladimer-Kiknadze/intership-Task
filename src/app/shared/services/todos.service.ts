import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, mergeMap } from 'rxjs';
import { ENVIRONMENT } from '../../environments/environment';
import { Todo, TodosWithAuthor } from '../types/todos.model';
import { User } from '../types/user.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENVIRONMENT);

  userTodos$ = new BehaviorSubject<Todo[]>([]);
  todosWithAuthor$ = new BehaviorSubject<TodosWithAuthor[]>([]);

  getUserTodoList(id: string) {
    this.http
      .get<Todo[]>(`${this.env.apiUrl}/todos?userId=${id}`)
      .subscribe((response) => {
        this.userTodos$.next(response);
      });
  }

  getTodosWithAuthors(id: string) {
    return this.http
      .get<Todo[]>(`${this.env.apiUrl}/todos?userId=${id}`)
      .pipe(
        mergeMap((todos) => {
          return this.http.get<User[]>(`${this.env.apiUrl}/users`).pipe(
            map((users) => {
              return todos.map((todo) => {
                return {
                  ...todo,
                  authorName: users.find((user) => user.id === todo.userId)
                    ?.name,
                };
              });
            })
          );
        })
      )
      .subscribe((response) => {
        this.todosWithAuthor$.next(response);
      });
  }
}
