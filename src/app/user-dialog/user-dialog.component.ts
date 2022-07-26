import { Component, Inject, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public userService: UserServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public UserData: any,
    private diologRef: MatDialogRef<UserDialogComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.UserData);
  }

  roleEditform = this.fb.group({
    role: ['', [Validators.required]],
  });

  editUser() {
    if (this.roleEditform.invalid) {
      return;
    } else {
      this.userService.userRoleid(this.UserData).subscribe((res) => {
        console.log(res);
        this.toaster.success(res.message, 'Success', { timeOut: 2000 });
      });
    }
    this.diologRef.close();

    // ! to reload without loading
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });

    this._snackBar.open(
      `Successfully Updated ${this.UserData.FirstName} ${this.UserData.LastName} 😊`,
      'ok',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
      }
    );

    // alert(
    //   `Successfully Updated ${this.UserData.FirstName} ${this.UserData.LastName} 😊`
    // );
  }
}
