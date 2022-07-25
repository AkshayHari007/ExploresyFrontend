import { OnInit, Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  users = [{
    FirstName: '',
    LastName: '',
    Gender: '',
    Dob: '',
    Mobile: null,
    Email: '',

    UserRole: null
  }];


  constructor(private user: UserServiceService) { }

  ngOnInit(): void {
    this.user.getAuthers().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        this.users = JSON.parse(JSON.stringify(res.data));
      }
      else {
        alert(res.message);
      }
    });
  }

}
