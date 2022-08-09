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
    return this.http.post<any>(`${baseurl}post/fetchmypost`,data);
  }
}
