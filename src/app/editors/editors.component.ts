import { OnInit, Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { UserServiceService } from '../services/user-service.service';

import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { UserdeleteDialogComponent } from '../userdelete-dialog/userdelete-dialog.component';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss'],
})
export class EditorsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  editors = [
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
    this.user.getEditors().subscribe((res: any) => {
      console.log(res);
      if (res.success) {
        console.log(res.message);
        this.editors = JSON.parse(JSON.stringify(res.data));
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
