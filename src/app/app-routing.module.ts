import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { EditorsComponent } from './editors/editors.component';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { EditorAuthGuard } from './guards/editor-auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admins', canActivate: [AdminAuthGuard], component: AdminComponent },
  {
    path: 'editors',
    canActivate: [EditorAuthGuard],
    component: EditorsComponent,
  },
  { path: 'authors', canActivate: [EditorAuthGuard], component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
