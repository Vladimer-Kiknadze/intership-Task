import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../../shared/components/tables/users/users.component';
import { PopupComponent } from '../../shared/components/popup/popup.component';

import { Observable, combineLatest } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { User, UserUpdate } from '../../shared/types/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UsersComponent, PopupComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  users$: Observable<UserUpdate[]>;
  userSearchControl = new FormControl('');

  constructor() {
    this.users$ = combineLatest([
      this.userService.users$,
      this.userSearchControl.valueChanges.pipe(startWith('')),
    ]).pipe(
      map(([users, search]) => {
        const searchValue = search?.toLowerCase() ?? '';
        return users
          .map((user: User) => ({
            ...user,
            firstName: user.name.split(' ')[0],
            lastName: user.name.split(' ').splice(1).join(' '),
          }))
          .filter((user: User) =>
            Object.values(user).some((value) =>
              String(value).toLowerCase().includes(searchValue)
            )
          );
      })
    );
  }

  ngOnInit(): void {
    this.userService.getUsers();
  }

  onPostsClick(userId: number) {
    console.log('Posts clicked for user:', userId);
    this.router.navigate(['/posts'], { queryParams: { userId } });
  }

  onTodosClick(userId: number) {
    console.log('Todos clicked for user:', userId);
    this.router.navigate(['/todos'], { queryParams: { userId } });
  }
}
