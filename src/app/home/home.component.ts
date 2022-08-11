import { Component, OnInit } from '@angular/core';
import { ContentServiceService } from '../services/content-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MyPostsEditDialogComponent } from '../my-posts-edit-dialog/my-posts-edit-dialog.component';
import { MyPostsDeleteDialogComponent } from '../my-posts-delete-dialog/my-posts-delete-dialog.component';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pic = '../../assets/images/user-avatar.png';

  posts = [
    {
      FirstName: '',
      LastName: '',
      Email: '',
      Category: '',
      Content: '',
      Image: '',
    },
  ];

  constructor(
    public dialog: MatDialog,
    private post: ContentServiceService,
    public user: UserServiceService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }

    this.post.getPost().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        this.posts = JSON.parse(JSON.stringify(res.data));
      } else {
        alert(res.message);
      }
    });
  }

  // isReadMore = true;

  // showText() {
  //   this.isReadMore = !this.isReadMore;
  // }

  openEdit(post: any) {
    this.dialog.open(MyPostsEditDialogComponent, {
      width: 'auto',
      data: post,
    });
  }

  openDelete(post: any) {
    this.dialog.open(MyPostsDeleteDialogComponent, {
      width: '30%',
      data: post,
    });
  }
}
