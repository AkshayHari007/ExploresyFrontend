import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { UserServiceService } from './services/user-service.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { EditorsComponent } from './editors/editors.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserdeleteDialogComponent } from './userdelete-dialog/userdelete-dialog.component';
import { ToastrModule } from 'ngx-toastr';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { ContentServiceService } from './services/content-service.service';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { MyPostsDialogComponent } from './my-posts-dialog/my-posts-dialog.component';
import { CategoryContentComponent } from './category-content/category-content.component';
import { MyPostsEditDialogComponent } from './my-posts-edit-dialog/my-posts-edit-dialog.component';
import { MyPostsDeleteDialogComponent } from './my-posts-delete-dialog/my-posts-delete-dialog.component';
import { CategoryDeleteDialogComponent } from './category-delete-dialog/category-delete-dialog.component';
import { CategoryEditDialogComponent } from './category-edit-dialog/category-edit-dialog.component';
import { UserProfileDialogComponent } from './user-profile-dialog/user-profile-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    SignupComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    HomeComponent,
    AdminComponent,
    EditorsComponent,
    UserDialogComponent,
    UserdeleteDialogComponent,
    CategoriesComponent,
    CategoryDialogComponent,
    MyPostsComponent,
    MyPostsDialogComponent,
    CategoryContentComponent,
    MyPostsEditDialogComponent,
    MyPostsDeleteDialogComponent,
    CategoryDeleteDialogComponent,
    CategoryEditDialogComponent,
    UserProfileDialogComponent,
  ],
  entryComponents: [
    UserDialogComponent,
    UserdeleteDialogComponent,
    CategoryDialogComponent,
    CategoryEditDialogComponent,
    CategoryDeleteDialogComponent,
    MyPostsDialogComponent,
    MyPostsEditDialogComponent,
    MyPostsDeleteDialogComponent,
    UserProfileDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    UserServiceService,
    ContentServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
