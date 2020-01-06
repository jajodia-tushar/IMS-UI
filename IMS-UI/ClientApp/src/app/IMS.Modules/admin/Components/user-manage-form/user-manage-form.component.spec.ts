import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManageFormComponent } from './user-manage-form.component';

describe('UserAddFormComponent', () => {
  let component: UserManageFormComponent;
  let fixture: ComponentFixture<UserManageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserManageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
