import { Component, Input } from '@angular/core';
import { User } from '../../shared/types/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  @Input({ required: true }) userDetail!: User;
}
