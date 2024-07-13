import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  users$ = this.userService.users$;

  ngOnInit(): void {
    this.userService.getUsers();
  }

  constructor() {
    this.userService.getUsers();
  }
  onClickUser(userId: number) {
    this.router.navigate(['/posts'], { queryParams: { userId } });
  }
}
