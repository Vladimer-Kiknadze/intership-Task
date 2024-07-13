import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ENVIRONMENT } from '../../environments/environment';
import { User } from '../types/user.model';
import { userPost } from '../types/userPosts.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly env = inject(ENVIRONMENT);

  users$ = new BehaviorSubject<User[]>([]);
  userById$ = new BehaviorSubject<User | null>(null);
  userPosts$ = new BehaviorSubject<userPost[]>([]);

  getUsers() {
    return this.http
      .get<User[]>(`${this.env.apiUrl}/users`)
      .subscribe((response) => {
        this.users$.next(response);
      });
  }

  getUserById(id: string) {
    return this.http
      .get<User>(`${this.env.apiUrl}/users/${id}`)
      .subscribe((response) => {
        this.userById$.next(response);
      });
  }
}
