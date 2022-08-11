import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseurl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentServiceService {
  constructor(private http: HttpClient) {}

  categoryAdd(data: any) {
    return this.http.post<any>(`${baseurl}category/addcategory`, data);
    // .subscribe(data => {
    //   console.log(data);
    // })
  }

  getCategories() {
    return this.http.get(`${baseurl}category/fetch`);
  }

  getCategorieslist() {
    return this.http.get(`${baseurl}category/fetchlist`);
  }

  getCategory(data: any) {
    return this.http.post<any>(`${baseurl}post/fetchcategory`, data);
  }

  addPost(data: any) {
    return this.http.post<any>(`${baseurl}post/addpost`, data);
    // .subscribe(data => {
    //   console.log(data);
    // })
  }

  getPost() {
    return this.http.get(`${baseurl}post/fetch`);
  }

  getmyPost(data: any) {
    return this.http.post<any>(`${baseurl}post/fetchmypost`, data);
  }

  editPost(data: any) {
    return this.http.post<any>(`${baseurl}post/editpost`, data);
    // .subscribe(data => {
    //   console.log(data);
    // })
  }

  postDelete(id: any) {
    return this.http.delete(`${baseurl}post/delete/` + id);
    // .subscribe(data => {
    //   console.log(data);
    // })
  }
}
