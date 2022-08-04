import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public UserData: any,
    private diologRef: MatDialogRef<CategoryDialogComponent>
  ) {}

  ngOnInit(): void {}

  roleEditform = this.fb.group({
    role: ['', [Validators.required]],
  });

  addCategory() {
    if (this.roleEditform.invalid) {
      return;
    } else {
      // this.userService.userRoleid(this.UserData).subscribe((res) => {
      //   console.log(res);
      //   this.toaster.success(res.message, 'Success', { timeOut: 2000 });
      // });
    }
    this.diologRef.close();

    // ! to reload without loading
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });

    // this._snackBar.open(
    //   `Successfully Updated ${this.UserData.FirstName} ${this.UserData.LastName} 😊`,
    //   'ok',
    //   {
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //     duration: 2000,
    //   }
    // );

    // alert(
    //   `Successfully Updated ${this.UserData.FirstName} ${this.UserData.LastName} 😊`
    // );
  }
}
