import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostsEditDialogComponent } from './my-posts-edit-dialog.component';

describe('MyPostsEditDialogComponent', () => {
  let component: MyPostsEditDialogComponent;
  let fixture: ComponentFixture<MyPostsEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPostsEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPostsEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
