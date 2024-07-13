import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PostWithAuthor } from '../../../types/posts.model';
import { PostService } from '../../../services/post.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  private readonly postService = inject(PostService);

  posts$ = this.postService.postsWithAuthor$;

  constructor() {
    this.postService.getPostsWithAuthors();
  }
}
