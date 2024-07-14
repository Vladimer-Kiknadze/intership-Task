import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserUpdate } from '../../../types/user.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  @Input() users: UserUpdate[] | null = [];
  @Input() userSearchControl: FormControl = new FormControl('');
  @Output() postsClick = new EventEmitter<number>();
  @Output() todosClick = new EventEmitter<number>();

  onClickPosts(userId: number) {
    this.postsClick.emit(userId);
  }

  onClickTodos(userId: number) {
    this.todosClick.emit(userId);
  }
}
