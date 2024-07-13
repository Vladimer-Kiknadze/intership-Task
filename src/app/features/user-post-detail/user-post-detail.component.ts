import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../shared/services/post.service';
import { AsyncPipe } from '@angular/common';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UserService } from '../../shared/services/user.service';
import { userPost } from '../../shared/types/userPosts.model';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';
import { PopupComponent } from '../../shared/components/popup/popup.component';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/services/loading.service';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-user-post-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    UserDetailComponent,
    TruncateStringPipe,
    PopupComponent,
    SpinnerComponent,
  ],
  templateUrl: './user-post-detail.component.html',
  styleUrl: './user-post-detail.component.scss',
})
export class UserPostDetailComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postService = inject(PostService);
  private readonly userService = inject(UserService);
  private readonly loadingService = inject(LoadingService);

  isLoading$: Observable<boolean>;
  user$ = this.userService.userById$;
  userPostDetail$ = this.postService.userPostDetail$;
  userPosts$ = this.postService.userPosts$;
  popUpIsVisible: boolean = false;
  selectedUser: userPost | null = null;

  constructor() {
    this.isLoading$ = this.loadingService.isLoading$;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');

      if (id) {
        this.postService.getUserPostDetail(id);
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
