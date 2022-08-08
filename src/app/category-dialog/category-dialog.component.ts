import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { ContentServiceService } from '../services/content-service.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss'],
})
export class CategoryDialogComponent implements OnInit {
  url = '';
  categorysub = false;
  category = {
    Title: '',
    Image: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private toaster: ToastrService,
    private categoryService: ContentServiceService,
    @Inject(MAT_DIALOG_DATA) public UserData: any,
    private diologRef: MatDialogRef<CategoryDialogComponent>
  ) {}

  ngOnInit(): void {}

  selectFile(event: any) {
    this.category.Image = event.target.files[0];
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(<File>event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }

  categoryform = this.fb.group({
    category: ['', [Validators.required]],
    categoryimage: ['', [Validators.required]],
  });

  get AllControlsForCategory() {
    return this.categoryform.controls;
  }

  addCategory() {
    if (this.categoryform.invalid) {
      this.categorysub = true;
      return;
    } else {
      this.categorysub = true;
      const formdata = new FormData();
      formdata.append('title', this.category.Title);
      formdata.append('image', this.category.Image);

      this.categoryService.categoryAdd(formdata).subscribe((res) => {
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
