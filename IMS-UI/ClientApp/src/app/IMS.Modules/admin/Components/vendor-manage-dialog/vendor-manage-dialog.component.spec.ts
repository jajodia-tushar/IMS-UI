import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorManageDialogComponent } from './vendor-manage-dialog.component';

describe('VendorManageDialogComponent', () => {
  let component: VendorManageDialogComponent;
  let fixture: ComponentFixture<VendorManageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorManageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
