import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendordetailsComponent } from './vendordetails.component';

describe('VendordetailsComponent', () => {
  let component: VendordetailsComponent;
  let fixture: ComponentFixture<VendordetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendordetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
