import { Component, Inject, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-userdelete-dialog',
  templateUrl: './userdelete-dialog.component.html',
  styleUrls: ['./userdelete-dialog.component.scss'],
})
export class UserdeleteDialogComponent implements OnInit {
  constructor(
    public userSevice: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public UserData: any,
    private diologRef: MatDialogRef<UserdeleteDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.UserData);
  }

  deleteUser() {
    this.userSevice.userDelete(this.UserData._id).subscribe((res) => {
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
      `Successfully Deleted ${this.UserData.FirstName} ${this.UserData.LastName}`,
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
