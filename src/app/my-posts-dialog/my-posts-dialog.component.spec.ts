import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostsDialogComponent } from './my-posts-dialog.component';

describe('MyPostsDialogComponent', () => {
  let component: MyPostsDialogComponent;
  let fixture: ComponentFixture<MyPostsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPostsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPostsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
