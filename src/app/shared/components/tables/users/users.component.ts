import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule, RouterLink, SpinnerComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly loadingService = inject(LoadingService);

  isLoading$: Observable<boolean>;

  public userSearch: string = '';
  private searchSubject$ = new BehaviorSubject<string>('');

  users$ = combineLatest([this.userService.users$, this.searchSubject$]).pipe(
    map(([users, search]) => {
      return users
        .map((user) => ({
          ...user,
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ').splice(1).join(' '),
        }))
        .filter((user) =>
          Object.values(user).some((value) =>
            String(value).toLowerCase().includes(search.toLowerCase())
          )
        );
    })
  );

  constructor() {
    this.isLoading$ = this.loadingService.isLoading$;
  }

  ngOnInit(): void {
    this.userService.getUsers();
  }

  onClickPosts(userId: number) {
    this.router.navigate(['/posts'], { queryParams: { userId } });
  }

  onClickTodos(userId: number) {
    this.router.navigate(['/todos'], { queryParams: { userId } });
  }

  onSearchChange(search: string) {
    this.searchSubject$.next(search);
  }
}
