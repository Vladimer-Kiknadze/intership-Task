import { Component, inject } from '@angular/core';

import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  users$ = this.userService.users$;

  constructor() {
    this.userService.getUsers();
  }
  onClickUser(userId: number) {
    this.router.navigate(['/posts'], { queryParams: { userId } });
  }
}
