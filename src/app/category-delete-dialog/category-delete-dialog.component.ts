import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentServiceService } from '../services/content-service.service';

@Component({
  selector: 'app-category-delete-dialog',
  templateUrl: './category-delete-dialog.component.html',
  styleUrls: ['./category-delete-dialog.component.scss'],
})
export class CategoryDeleteDialogComponent implements OnInit {
  constructor(
    private content: ContentServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public CategoryData: any,
    private diologRef: MatDialogRef<CategoryDeleteDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.CategoryData);
  }

  deletePost() {
    this.content.categoryDelete(this.CategoryData._id).subscribe((res) => {
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
      `Successfully Deleted ${this.CategoryData.Title} Category`,
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
