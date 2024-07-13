import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ENVIRONMENT } from '../../environments/environment';
import { User } from '../types/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENVIRONMENT);
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  users$ = new BehaviorSubject<User[]>([]);

  getUsers() {
    return this.http.get<any>(this.usersUrl).subscribe((response) => {
      this.users$.next(response);
    });
  }

  getPostsWithAuthors(): Observable<any> {
    return this.http.get<any[]>(this.postsUrl).pipe(
      mergeMap((posts) => {
        return this.http.get<any[]>(this.usersUrl).pipe(
          map((users) => {
            return posts.map((post) => {
              return {
                ...post,
                authorName: users.find((user) => user.id === post.userId)?.name,
              };
            });
          })
        );
      })
    );
  }
}
