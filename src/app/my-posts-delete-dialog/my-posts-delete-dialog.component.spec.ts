import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostsDeleteDialogComponent } from './my-posts-delete-dialog.component';

describe('MyPostsDeleteDialogComponent', () => {
  let component: MyPostsDeleteDialogComponent;
  let fixture: ComponentFixture<MyPostsDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPostsDeleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPostsDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
