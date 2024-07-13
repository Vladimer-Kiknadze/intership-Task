import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { PostWithAuthor } from '../../../types/posts.model';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  private readonly postService = inject(UserService);
  posts: PostWithAuthor[] = [];
  ngOnInit(): void {
    this.postService.getPostsWithAuthors().subscribe((data) => {
      this.posts = data;
    });
  }
}
