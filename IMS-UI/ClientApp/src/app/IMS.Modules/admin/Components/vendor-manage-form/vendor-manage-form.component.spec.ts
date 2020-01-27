import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorManageFormComponent } from './vendor-manage-form.component';

describe('VendorManageFormComponent', () => {
  let component: VendorManageFormComponent;
  let fixture: ComponentFixture<VendorManageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorManageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorManageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
