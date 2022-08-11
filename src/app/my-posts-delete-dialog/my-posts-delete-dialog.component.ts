import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentServiceService } from '../services/content-service.service';

@Component({
  selector: 'app-my-posts-delete-dialog',
  templateUrl: './my-posts-delete-dialog.component.html',
  styleUrls: ['./my-posts-delete-dialog.component.scss'],
})
export class MyPostsDeleteDialogComponent implements OnInit {
  constructor(
    private content: ContentServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public PostData: any,
    private diologRef: MatDialogRef<MyPostsDeleteDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.PostData);
  }

  deletePost() {
    this.content.postDelete(this.PostData._id).subscribe((res) => {
      console.log(res);
    });

    this.diologRef.close();

    // ! to reload without loading
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });

    this._snackBar.open(
      `Successfully Deleted the Post`,
      'ok',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
      }
    );

    // alert(
    //   `Successfully Deleted ${this.UserData.FirstName} ${this.UserData.LastName}`
    // );
  }
}
