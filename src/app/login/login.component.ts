import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginSubmitted = false;
  loginHide = true;

  user = {
    Email: '',
    Password: '',
  };

  constructor(
    private fb: FormBuilder,
    private userSevice: UserServiceService,
    private _router: Router,
    private toaster: ToastrService,
    private route: ActivatedRoute
  ) {}

  loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^([A-Za-z0-9.-]+)@([A-Za-z0-9-]+)([.])([a-z]{2,3})(.[a-z]{2,3})?$'
        ),
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {}

  get AllControlsForLogin() {
    return this.loginForm.controls;
  }

  onSubmitlogin(values: any) {
    if (this.loginForm.invalid) {
      this.loginSubmitted = true;
      // console.log({ values });
      return;
    } else {
      this.loginSubmitted = true;
      this.userSevice.userLogin(this.user).subscribe((res: any) => {
        console.log(res);
        if (res.success) {
          console.log(res.message);
          this.toaster.success(
            'Welcome Back!',
            `Hi ${res.data.FirstName} ${res.data.LastName}`,
            { timeOut: 2000 }
          );
          localStorage.setItem('roleId', res.data.UserRole);
          localStorage.setItem('FirstName', res.data.FirstName);
          localStorage.setItem('LastName', res.data.LastName);
          localStorage.setItem('Email', res.data.Email);
          localStorage.setItem('token', res.token);

          this._router.navigate(['']);
        } else {
          // alert(res.message);
          this.toaster.error(res.message, 'Error', { timeOut: 2000 });
        }
      });
    }
  }
}
