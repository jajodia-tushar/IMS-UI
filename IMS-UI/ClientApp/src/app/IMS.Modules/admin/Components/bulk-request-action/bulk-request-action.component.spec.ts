import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkRequestActionComponent } from './bulk-request-action.component';

describe('BulkRequestActionComponent', () => {
  let component: BulkRequestActionComponent;
  let fixture: ComponentFixture<BulkRequestActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkRequestActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkRequestActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
