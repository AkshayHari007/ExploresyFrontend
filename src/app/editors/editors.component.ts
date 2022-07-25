import { OnInit, Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss']
})
export class EditorsComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  editors = [{
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

    this.user.getEditors().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        this.editors = JSON.parse(JSON.stringify(res.data));
      }
      else {
        alert(res.message);
      }
    });

  }

}
