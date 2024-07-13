import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { TruncateStringPipe } from '../../shared/pipes/truncate-string.pipe';
import { PopupComponent } from '../../shared/components/popup/popup.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';

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

  // userPosts$ = this.userService.userPosts$;
  // user$ = this.userService.userById$;
  popUpIsVisible: boolean = false;
  selectedUser: any = null;

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('userId');
      if (id) {
        // this.userService.getPostsByUserId(id);
        // this.userService.getUserById(id);
      }
    });
  }

  showPopup(user: any) {
    this.selectedUser = user;
    this.popUpIsVisible = true;
  }

  hidePopup(check: boolean) {
    this.popUpIsVisible = check;
  }
}
