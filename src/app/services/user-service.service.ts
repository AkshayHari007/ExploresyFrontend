import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseurl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  // private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  userSignup(data: any) {
    return this.http.post<any>(`${baseurl}signup/adduser`, data);
    // .subscribe(data => {
    //   console.log(data);
    // })
  }

  getProfile(data: any) {
    return this.http.post<any>(`${baseurl}users/fetch`, data);
  }

  editProfile(data: any) {
    return this.http.post<any>(`${baseurl}users/editprofile`, data);
    // .subscribe(data => {
    //   console.log(data);
    // })
  }

  userRoleid(data: any) {
    return this.http.post<any>(`${baseurl}users/roleid`, data);
    // .subscribe(data => {
    //   console.log(data);
    // })
  }

  userDelete(id: any) {
    return this.http.delete(`${baseurl}users/delete/` + id);
    // .subscribe(data => {
    //   console.log(data);
    // })
  }

  userLogin(data: any) {
    return this.http.post<any>(`${baseurl}login`, data);
  }

  authorLogin() {
    if (
      !!localStorage.getItem('token') &&
      localStorage.getItem('roleId') === '3'
    ) {
      return true;
    } else {
      return false;
    }
  }

  editorLogin() {
    if (
      !!localStorage.getItem('token') &&
      localStorage.getItem('roleId') === '2'
    ) {
      return true;
    } else {
      return false;
    }
  }

  adminLogin() {
    if (
      !!localStorage.getItem('token') &&
      localStorage.getItem('roleId') === '1'
    ) {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getAuthers() {
    return this.http.get(`${baseurl}users/authors`);
  }

  getEditors() {
    return this.http.get(`${baseurl}users/editors`);
  }

  getAdmins() {
    return this.http.get(`${baseurl}users/admins`);
  }
}
