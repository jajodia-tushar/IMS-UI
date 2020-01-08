import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisableTableComponent } from './revisable-table.component';

describe('RevisableTableComponent', () => {
  let component: RevisableTableComponent;
  let fixture: ComponentFixture<RevisableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
