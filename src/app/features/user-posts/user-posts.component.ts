import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';
import { PopupComponent } from '../../shared/components/popup/popup.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { userPost } from '../../shared/types/userPosts.model';
import { BehaviorSubject, map, tap } from 'rxjs';
import { PostService } from '../../shared/services/post.service';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [
    AsyncPipe,
    TruncateStringPipe,
    PopupComponent,
    CommonModule,
    UserDetailComponent,
  ],
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly postService = inject(PostService);

  user$ = this.userService.userById$;
  userPosts$ = this.postService.userPosts$;
  popUpIsVisible: boolean = false;
  selectedUser: userPost | null = null;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('userId');
      if (id) {
        this.postService.getPostsByUserId(id);
        this.userService.getUserById(id);
      }
    });
  }

  showPopup(user: userPost) {
    this.selectedUser = user;
    this.popUpIsVisible = true;
  }

  hidePopup(check: boolean) {
    this.popUpIsVisible = check;
  }
}
