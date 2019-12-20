import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageDialogComponent } from './user-manage-dialog.component';

describe('UserAddDialogComponent', () => {
  let component: UserManageDialogComponent;
  let fixture: ComponentFixture<UserManageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
