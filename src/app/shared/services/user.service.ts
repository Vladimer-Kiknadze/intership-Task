import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ENVIRONMENT } from '../../environments/environment';
import { User } from '../types/user.model';
import { userPost } from '../types/userPosts.model';
import { LoadingService, SkipLoading } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENVIRONMENT);
  private readonly loadingService = inject(LoadingService);

  users$ = new BehaviorSubject<User[]>([]);
  userById$ = new BehaviorSubject<User | null>(null);
  userPosts$ = new BehaviorSubject<userPost[]>([]);

  getUsers(skipLoading: boolean = false) {
    this.http
      .get<User[]>(`${this.env.apiUrl}/users`, {
        context: skipLoading
          ? new HttpContext().set(SkipLoading, true)
          : undefined,
      })
      .subscribe((response) => {
        this.users$.next(response);
      });
  }

  getUserById(id: string, skipLoading: boolean = false) {
    this.http
      .get<User>(`${this.env.apiUrl}/users/${id}`, {
        context: skipLoading
          ? new HttpContext().set(SkipLoading, true)
          : undefined,
      })
      .subscribe((response) => {
        this.userById$.next(response);
      });
  }

  getUserPosts(userId: string, skipLoading: boolean = false) {
    if (!skipLoading) {
      this.loadingService.loadingOn();
    }

    this.http
      .get<userPost[]>(`${this.env.apiUrl}/posts?userId=${userId}`, {
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
}
