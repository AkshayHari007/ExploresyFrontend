import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrls: ['./user-profile-dialog.component.scss'],
})
export class UserProfileDialogComponent implements OnInit {
  signupSubmitted = false;
  signupHide = true;
  signupHideC = true;

  genders = [
    { id: 1, field: 'Male' },
    { id: 2, field: 'Female' },
  ];

  user = {
    _id: '',
    FirstName: '',
    LastName: '',
    Gender: '',
    Dob: '',
    Mobile: null,
    Password: '',
  };

  req = {
    Email: JSON.parse(JSON.stringify(localStorage.getItem('Email'))),
  };

  constructor(
    private fb: FormBuilder,
    private userSevice: UserServiceService,
    private _router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private toaster: ToastrService,
    private diologRef: MatDialogRef<UserProfileDialogComponent>
  ) {}

  signupForm = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('^([0-9]{10})$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      cpassword: ['', [Validators.required]],
    },
    {
      validators: () => {
        if (
          this.signupForm?.controls['password']?.value !=
          this.signupForm?.controls['cpassword']?.value
        )
          this.signupForm?.controls['cpassword']?.setErrors({
            passwordMismatch: true,
          });
      },
    }
  );

  ngOnInit(): void {
    this.userSevice.getProfile(this.req).subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        this.user = JSON.parse(JSON.stringify(res.data));
      } else {
        alert(res.message);
      }
    });
  }

  get AllControlsForSignup() {
    return this.signupForm.controls;
  }

  onEdit() {
    if (this.signupForm.invalid) {
      this.signupSubmitted = true;
      return;
    } else {
      this.signupSubmitted = true;
      this.userSevice.editProfile(this.user).subscribe((res) => {
        console.log(res);
        if (res.success) {
          this._snackBar.open(
            'Your Profile is Successfully Updated. Please LogIn Again 😊',
            'ok',
            {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 4000,
            }
          );
          this.diologRef.close();
          localStorage.removeItem('token');
          localStorage.removeItem('roleId');
          localStorage.removeItem('FirstName');
          localStorage.removeItem('LastName');
          localStorage.removeItem('Email');
          localStorage.removeItem('category');
          this._router.navigate(['/register']);
        } else {
          this.toaster.error(res.message, 'Error!', { timeOut: 4000 });
        }
      });
    }

    // console.log({ values });
  }
}
