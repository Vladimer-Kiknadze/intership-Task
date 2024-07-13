import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoService } from '../../shared/services/todos.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './user-todos.component.html',
  styleUrl: './user-todos.component.scss',
})
export class UserTodosComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly todoService = inject(TodoService);

  todosWithAuthor$ = this.todoService.todosWithAuthor$;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('userId');
      if (id) {
        this.todoService.getUserTodoList(id);
        this.todoService.getTodosWithAuthors(id);
      }
      console.log(this.todosWithAuthor$);
    });
  }

  constructor() {}
}
