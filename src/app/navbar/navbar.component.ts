import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter();
  logo = true;
  constructor(public user:UserServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  toogleSidebar() {
    this.toggleSideBar.emit();
    this.logo=!this.logo;
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('roleId');
    this.router.navigate(['/register']);
  }

}