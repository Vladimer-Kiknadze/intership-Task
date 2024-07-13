import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ENVIRONMENT } from '../../environments/environment';
import { User } from '../types/user.model';
import { userPost } from '../types/userPosts.model';
import { Post, PostWithAuthor } from '../types/posts.model';
import { LoadingService, SkipLoading } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENVIRONMENT);
  private readonly loadingService = inject(LoadingService);

  userPosts$ = new BehaviorSubject<userPost[]>([]);
  postsWithAuthor$ = new BehaviorSubject<PostWithAuthor[]>([]);
  userPostDetail$ = new BehaviorSubject<Post | null>(null);

  getUserPostDetail(id: string, skipLoading: boolean = false) {
    if (!skipLoading) {
      this.loadingService.loadingOn();
    }

    return this.http
      .get<Post>(`${this.env.apiUrl}/posts/${id}`, {
        context: skipLoading
          ? new HttpContext().set(SkipLoading, true)
          : undefined,
      })
      .subscribe((response) => {
        this.userPostDetail$.next(response);
        if (!skipLoading) {
          this.loadingService.loadingOff();
        }
      });
  }

  getPostsByUserId(id: string, skipLoading: boolean = false) {
    if (!skipLoading) {
      this.loadingService.loadingOn();
    }

    return this.http
      .get<userPost[]>(`${this.env.apiUrl}/posts?userId=${id}`, {
        context: skipLoading
          ? new HttpContext().set(SkipLoading, true)
          : undefined,
      })
      .subscribe((response) => {
        this.userPosts$.next(response);
        if (!skipLoading) {
          this.loadingService.loadingOff();
        }
      });
  }

  getPostsWithAuthors(skipLoading: boolean = false) {
    if (!skipLoading) {
      this.loadingService.loadingOn();
    }

    return this.http
      .get<Post[]>(`${this.env.apiUrl}/posts`, {
        context: skipLoading
          ? new HttpContext().set(SkipLoading, true)
          : undefined,
      })
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
        if (!skipLoading) {
          this.loadingService.loadingOff();
        }
      });
  }
}
