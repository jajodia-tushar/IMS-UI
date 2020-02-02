import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkReturnDialogComponent } from './bulk-return-dialog.component';

describe('BulkReturnDialogComponent', () => {
  let component: BulkReturnDialogComponent;
  let fixture: ComponentFixture<BulkReturnDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkReturnDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkReturnDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
