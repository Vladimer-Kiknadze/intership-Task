import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PostService } from '../../../services/post.service';
import { Router, RouterLink } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { Observable } from 'rxjs';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink, SpinnerComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  private readonly postService = inject(PostService);
  private readonly loadingService = inject(LoadingService);

  private readonly router = inject(Router);

  isLoading$: Observable<boolean>;
  posts$ = this.postService.postsWithAuthor$;

  constructor() {
    this.postService.getPostsWithAuthors();
    this.isLoading$ = this.loadingService.isLoading$;
  }
}
