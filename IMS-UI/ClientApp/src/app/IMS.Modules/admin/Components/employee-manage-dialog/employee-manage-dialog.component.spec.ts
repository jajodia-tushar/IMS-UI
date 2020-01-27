import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManageDialogComponent } from './employee-manage-dialog.component';

describe('EmployeeManageDialogComponent', () => {
  let component: EmployeeManageDialogComponent;
  let fixture: ComponentFixture<EmployeeManageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeManageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
