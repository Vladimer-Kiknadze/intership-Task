import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ENVIRONMENT } from '../../environments/environment';
import { User } from '../types/user.model';
import { userPost } from '../types/userPosts.model';
import { Post, PostWithAuthor } from '../types/posts.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENVIRONMENT);

  userPosts$ = new BehaviorSubject<userPost[]>([]);
  postsWithAuthor$ = new BehaviorSubject<PostWithAuthor[]>([]);
  userPostDetail$ = new BehaviorSubject<Post | null>(null);

  getUserPostDetail(id: string) {
    return this.http
      .get<Post>(`${this.env.apiUrl}/posts/${id}`)
      .subscribe((response) => {
        this.userPostDetail$.next(response);
      });
  }

  getPostsByUserId(id: string) {
    return this.http
      .get<userPost[]>(`${this.env.apiUrl}/posts?userId=${id}`)
      .subscribe((response) => {
        this.userPosts$.next(response);
      });
  }

  getPostsWithAuthors() {
    return this.http
      .get<Post[]>(`${this.env.apiUrl}/posts`)
      .pipe(
        mergeMap((posts) => {
          return this.http.get<User[]>(`${this.env.apiUrl}/users`).pipe(
            map((users) => {
              return posts.map((post) => {
                return {
                  ...post,
                  authorName: users.find((user) => user.id === post.userId)
                    ?.name,
                };
              });
            })
          );
        })
      )
      .subscribe((response) => {
        this.postsWithAuthor$.next(response);
      });
  }
}
