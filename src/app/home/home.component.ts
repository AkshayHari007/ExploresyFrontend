import { Component, OnInit } from '@angular/core';
import { ContentServiceService } from '../services/content-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  pic = '../../assets/images/user-avatar.png';

  posts = [
    {
      FirstName: '',
      LastName: '',
      Email: '',
      Category: '',
      Content: '',
      Image: '',
    },
  ];

  constructor(private post: ContentServiceService) {}

  ngOnInit(): void {
    this.post.getPost().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        this.posts = JSON.parse(JSON.stringify(res.data));
      } else {
        alert(res.message);
      }
    });
  }

  isReadMore = true;

  showText() {
    this.isReadMore = !this.isReadMore;
  }
}
