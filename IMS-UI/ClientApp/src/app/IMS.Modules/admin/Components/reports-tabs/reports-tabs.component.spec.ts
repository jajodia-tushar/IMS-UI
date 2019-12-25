import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsTabsComponent } from './reports-tabs.component';

describe('ReportsTabsComponent', () => {
  let component: ReportsTabsComponent;
  let fixture: ComponentFixture<ReportsTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
