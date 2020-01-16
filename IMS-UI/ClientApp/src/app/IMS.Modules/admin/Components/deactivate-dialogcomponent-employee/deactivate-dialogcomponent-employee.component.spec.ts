import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateDialogcomponentEmployeeComponent } from './deactivate-dialogcomponent-employee.component';

describe('DeactivateDialogcomponentEmployeeComponent', () => {
  let component: DeactivateDialogcomponentEmployeeComponent;
  let fixture: ComponentFixture<DeactivateDialogcomponentEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeactivateDialogcomponentEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivateDialogcomponentEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
