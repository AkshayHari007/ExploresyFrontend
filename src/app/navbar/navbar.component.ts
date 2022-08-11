import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter();
  logo = true;
  constructor(
    public user: UserServiceService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  FirstName = localStorage.getItem('FirstName');
  LastName = localStorage.getItem('LastName');

  ngOnInit(): void {}

  toogleSidebar() {
    this.toggleSideBar.emit();
    this.logo = !this.logo;
  }

  editProfile() {
    this.dialog.open(UserProfileDialogComponent, {
      width: '30%',
    });
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
    localStorage.removeItem('FirstName');
    localStorage.removeItem('LastName');
    localStorage.removeItem('Email');
    localStorage.removeItem('category');
    this.router.navigate(['/register']);
  }
}
