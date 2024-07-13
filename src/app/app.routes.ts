import { Routes } from '@angular/router';
import { PostsComponent } from './shared/components/tables/posts/posts.component';
import { HomeComponent } from './features/home/home.component';
import { UserPostsComponent } from './features/user-posts/user-posts.component';

export const routes: Routes = [
  { path: 'posts', component: PostsComponent },
  { path: 'posts', component: UserPostsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
