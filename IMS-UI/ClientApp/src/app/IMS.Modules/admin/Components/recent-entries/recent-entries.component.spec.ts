import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentEntriesComponent } from './recent-entries.component';

describe('RecentEntriesComponent', () => {
  let component: RecentEntriesComponent;
  let fixture: ComponentFixture<RecentEntriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentEntriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
