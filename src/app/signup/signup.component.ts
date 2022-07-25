import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  signupSubmitted = false;
  signupHide = true;
  signupHideC = true;

  genders = [
    { id: 1, field: 'Male' },
    { id: 2, field: 'Female' }
  ];

  user = {
    FirstName: '',
    LastName: '',
    Gender: '',
    Dob: '',
    Mobile: null,
    Email: '',
    Password: '',
    UserRole:3
  };

  constructor(private fb: FormBuilder, private userSevice: UserServiceService, private _router: Router) { }


  signupForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.pattern('^([0-9]{10})$')]],
    email: ['', [Validators.required, Validators.pattern('^([A-Za-z0-9\.-]+)@([A-Za-z0-9\-]+)([\.])([a-z]{2,3})(\.[a-z]{2,3})?$')]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    cpassword: ['', [Validators.required]]
  }, {
    validators: () => {
      if (this.signupForm?.controls['password']?.value != this.signupForm?.controls['cpassword']?.value)
        this.signupForm?.controls['cpassword']?.setErrors({ passwordMismatch: true })
    }
  }
  );

  ngOnInit(): void {
  }


  get AllControlsForSignup() {
    return this.signupForm.controls
  }



  onSubmitsignup(values: any) {

    if (this.signupForm.invalid) {
      this.signupSubmitted = true;
      return;
    } else {


      this.signupSubmitted = true;
      this.userSevice.userSignup(this.user).subscribe((res) => {
        console.log(res);

      });
    }
    // console.log({ values });
    alert("Your Signup is Successful! Please LogIn to Exploresy 😊");
    this.signupForm.reset();
    this._router.navigate(['register']).then(() => {
    window.location.reload();
  });
  }

}
