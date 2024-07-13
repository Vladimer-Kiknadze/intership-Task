import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ENVIRONMENT } from '../../environments/environment';
import { Todo, TodosWithAuthor } from '../types/todos.model';
import { User } from '../types/user.model';
import { LoadingService } from './loading.service';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENVIRONMENT);
  private readonly loadingService = inject(LoadingService);

  userTodos$ = new BehaviorSubject<Todo[]>([]);
  todosWithAuthor$ = new BehaviorSubject<TodosWithAuthor[]>([]);

  getUserTodoList(id: string, skipLoading: boolean = false) {
    const request = this.http.get<Todo[]>(
      `${this.env.apiUrl}/todos?userId=${id}`,
      {
        context: skipLoading
          ? new HttpContext().set(SkipLoading, true)
          : undefined,
      }
    );

    request.subscribe((response) => {
      this.userTodos$.next(response);
    });
  }

  getTodosWithAuthors(id: string, skipLoading: boolean = false) {
    const request = this.http.get<Todo[]>(
      `${this.env.apiUrl}/todos?userId=${id}`,
      {
        context: skipLoading
          ? new HttpContext().set(SkipLoading, true)
          : undefined,
      }
    );

    request
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
