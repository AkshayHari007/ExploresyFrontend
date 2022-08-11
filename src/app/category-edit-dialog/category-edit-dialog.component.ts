import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { ContentServiceService } from '../services/content-service.service';

@Component({
  selector: 'app-category-edit-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrls: ['./category-edit-dialog.component.scss'],
})
export class CategoryEditDialogComponent implements OnInit {
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
    @Inject(MAT_DIALOG_DATA) public CategoryData: any,
    private diologRef: MatDialogRef<CategoryEditDialogComponent>
  ) {}

  ngOnInit(): void {}

  // selectFile(event: any) {
  //   this.category.Image = event.target.files[0];
  //   if (event.target.files) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(<File>event.target.files[0]);
  //     reader.onload = (event: any) => {
  //       this.url = event.target.result;
  //     };
  //   }
  // }

  categoryform = this.fb.group({
    category: ['', [Validators.required]],
    // categoryimage: ['', [Validators.required]],
  });

  get AllControlsForCategory() {
    return this.categoryform.controls;
  }

  editCategory() {
    if (this.categoryform.invalid) {
      this.categorysub = true;
      return;
    } else {
      this.categorysub = true;

      this.categoryService.categoryEdit(this.CategoryData).subscribe((res) => {
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
  closeEdit() {
    this.diologRef.close();

    // ! to reload without loading
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}
