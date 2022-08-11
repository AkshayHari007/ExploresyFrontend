import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { ContentServiceService } from '../services/content-service.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories = [
    {
      Title: '',
      Image: '',
    },
  ];

  constructor(
    public dialog: MatDialog,
    private content: ContentServiceService,
    public user: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    localStorage.removeItem('category');
    this.content.getCategories().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        this.categories = JSON.parse(JSON.stringify(res.data));
      } else {
        alert(res.message);
      }
    });
  }

  addCategory() {
    this.dialog.open(CategoryDialogComponent, {
      width: '30%',
    });
  }

  routeCategory(category: any) {
    localStorage.setItem('category', category);
    this.router.navigate(['category']);
  }
}
