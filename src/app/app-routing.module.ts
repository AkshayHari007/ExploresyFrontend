import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryContentComponent } from './category-content/category-content.component';
import { EditorsComponent } from './editors/editors.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { EditorAuthGuard } from './guards/editor-auth.guard';
import { HomeComponent } from './home/home.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admins', canActivate: [AdminAuthGuard], component: AdminComponent },
  {
    path: 'editors',
    canActivate: [EditorAuthGuard],
    component: EditorsComponent,
  },
  { path: 'authors', canActivate: [EditorAuthGuard], component: UserComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'category', component: CategoryContentComponent },
  { path: 'myposts', canActivate: [AuthGuard], component: MyPostsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
