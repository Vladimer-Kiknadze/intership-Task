import { Routes } from '@angular/router';
import { PostsComponent } from './shared/components/tables/posts/posts.component';
import { HomeComponent } from './features/home/home.component';
import { UserPostsComponent } from './features/user-posts/user-posts.component';
import { UserPostDetailComponent } from './features/user-post-detail/user-post-detail.component';

export const routes: Routes = [
  { path: 'posts', component: UserPostsComponent },
  { path: 'posts/:id', component: UserPostDetailComponent },
  { path: 'allPost', component: PostsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
