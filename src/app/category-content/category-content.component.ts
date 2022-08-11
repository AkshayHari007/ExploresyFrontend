import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentServiceService } from '../services/content-service.service';
import { MatDialog } from '@angular/material/dialog';
import { MyPostsEditDialogComponent } from '../my-posts-edit-dialog/my-posts-edit-dialog.component';
import { MyPostsDeleteDialogComponent } from '../my-posts-delete-dialog/my-posts-delete-dialog.component';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-category-content',
  templateUrl: './category-content.component.html',
  styleUrls: ['./category-content.component.scss'],
})
export class CategoryContentComponent implements OnInit {
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

  req = {
    category: JSON.parse(JSON.stringify(localStorage.getItem('category'))),
  };

  constructor(
    public dialog: MatDialog,
    private post: ContentServiceService,
    private router: Router,
    public user: UserServiceService
  ) {}

  ngOnInit(): void {
    if (this.req.category) {
      this.post.getCategory(this.req).subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          console.log(res.message);
          this.posts = JSON.parse(JSON.stringify(res.data));
        } else {
          alert(res.message);
        }
      });
    } else {
      this.router.navigate(['categories']);
    }
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
