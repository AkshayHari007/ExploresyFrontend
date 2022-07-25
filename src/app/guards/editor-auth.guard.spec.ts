import { TestBed } from '@angular/core/testing';

import { EditorAuthGuard } from './editor-auth.guard';

describe('EditorAuthGuard', () => {
  let guard: EditorAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditorAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
