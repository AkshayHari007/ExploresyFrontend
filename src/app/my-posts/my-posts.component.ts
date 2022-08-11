import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { ContentServiceService } from '../services/content-service.service';
import { MyPostsDialogComponent } from '../my-posts-dialog/my-posts-dialog.component';
import { MyPostsEditDialogComponent } from '../my-posts-edit-dialog/my-posts-edit-dialog.component';
import { MyPostsDeleteDialogComponent } from '../my-posts-delete-dialog/my-posts-delete-dialog.component';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss'],
})
export class MyPostsComponent implements OnInit {
  req = {
    Email: JSON.parse(JSON.stringify(localStorage.getItem('Email'))),
  };
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
  constructor(public dialog: MatDialog, private post: ContentServiceService) {}

  ngOnInit(): void {
    this.post.getmyPost(this.req).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        this.posts = JSON.parse(JSON.stringify(res.data));
      } else {
        alert(res.message);
      }
    });
  }
  addPost() {
    this.dialog.open(MyPostsDialogComponent, {
      width: 'auto',
    });
  }

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
