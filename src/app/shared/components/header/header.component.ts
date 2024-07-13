import { Component } from '@angular/core';
import { CurrentDateComponent } from '../current-date/current-date.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CurrentDateComponent, NavigationComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
