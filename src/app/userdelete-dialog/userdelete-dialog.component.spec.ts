import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdeleteDialogComponent } from './userdelete-dialog.component';

describe('UserdeleteDialogComponent', () => {
  let component: UserdeleteDialogComponent;
  let fixture: ComponentFixture<UserdeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserdeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
