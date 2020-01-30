import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkRequestDialogComponent } from './bulk-request-dialog.component';

describe('BulkRequestDialogComponent', () => {
  let component: BulkRequestDialogComponent;
  let fixture: ComponentFixture<BulkRequestDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkRequestDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
