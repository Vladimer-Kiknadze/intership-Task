import { Component } from '@angular/core';
import { UsersComponent } from '../../shared/components/tables/users/users.component';
import { PopupComponent } from '../../shared/components/popup/popup.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsersComponent, PopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
