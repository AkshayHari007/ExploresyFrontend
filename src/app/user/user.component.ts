import { OnInit, Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { UserServiceService } from '../services/user-service.service';

import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UserdeleteDialogComponent } from '../userdelete-dialog/userdelete-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  users = [
    {
      FirstName: '',
      LastName: '',
      Gender: '',
      Dob: '',
      Mobile: null,
      Email: '',

      UserRole: null,
    },
  ];

  constructor(private user: UserServiceService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.user.getAuthers().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        this.users = JSON.parse(JSON.stringify(res.data));
      } else {
        alert(res.message);
      }
    });
  }

  openEdit(user: any) {
    this.dialog.open(UserDialogComponent, {
      width: '30%',
      data: user,
    });
  }

  openDelete(user: any) {
    this.dialog.open(UserdeleteDialogComponent, {
      width: '30%',
      data: user,
    });
  }

  
}
