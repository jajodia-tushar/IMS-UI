import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManageFormComponent } from './employee-manage-form.component';

describe('EmployeeManageFormComponent', () => {
  let component: EmployeeManageFormComponent;
  let fixture: ComponentFixture<EmployeeManageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeManageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
