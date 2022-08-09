import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { ContentServiceService } from '../services/content-service.service';

@Component({
  selector: 'app-my-posts-dialog',
  templateUrl: './my-posts-dialog.component.html',
  styleUrls: ['./my-posts-dialog.component.scss'],
})
export class MyPostsDialogComponent implements OnInit {
  url = '';
  categories = [{ Title: '' }];
  postsub = false;
  post = {
    FirstName: JSON.parse(JSON.stringify(localStorage.getItem('FirstName'))),
    LastName: JSON.parse(JSON.stringify(localStorage.getItem('LastName'))),
    Email: JSON.parse(JSON.stringify(localStorage.getItem('Email'))),
    Category: '',
    Content: '',
    Image: '',
    stat: '0',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private toaster: ToastrService,
    private categoryService: ContentServiceService,
    @Inject(MAT_DIALOG_DATA) public UserData: any,
    private diologRef: MatDialogRef<MyPostsDialogComponent>
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategorieslist().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        this.categories = JSON.parse(JSON.stringify(res.data));
      } else {
        alert(res.message);
      }
    });
  }

  postform = this.fb.group({
    category: ['', [Validators.required]],
    content: ['', [Validators.required]],
    postimage: [''],
  });

  selectFile(event: any) {
    this.post.Image = event.target.files[0];
    this.url = '';
    this.post.stat = '0';
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(<File>event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.post.stat = '1';
      };
    }
  }

  get AllControlsForPost() {
    return this.postform.controls;
  }

  addCategory() {
    if (this.postform.invalid) {
      this.postsub = true;
      return;
    } else {
      this.postsub = true;
      const formdata = new FormData();
      formdata.append('FirstName', this.post.FirstName);
      formdata.append('LastName', this.post.LastName);
      formdata.append('Email', this.post.Email);
      formdata.append('Category', this.post.Category);
      formdata.append('Content', this.post.Content);
      formdata.append('Image', this.post.Image);
      formdata.append('Stat', this.post.stat);


      this.categoryService.addPost(formdata).subscribe((res) => {
        console.log(res);
        if (res.success) {
          this.toaster.success(res.message, 'Success', { timeOut: 2000 });
        } else {
          this.toaster.error(res.message, 'Error', { timeOut: 2000 });
        }
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
