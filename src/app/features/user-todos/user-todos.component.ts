import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TodoService } from '../../shared/services/todos.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoadingService } from '../../shared/services/loading.service';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from '../../shared/services/loading.interceptor';

@Component({
  selector: 'app-user-todos',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './user-todos.component.html',
  styleUrl: './user-todos.component.scss',
  providers: [
    TodoService,
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
})
export class UserTodosComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly todoService = inject(TodoService);
  private readonly loadingService = inject(LoadingService);

  todosWithAuthor$ = this.todoService.todosWithAuthor$;
  isLoading$: Observable<boolean>;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('userId');
      if (id) {
        this.todoService.getUserTodoList(id);
        this.todoService.getTodosWithAuthors(id);
      }
    });
  }

  constructor() {
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
