import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSessionOnRefreshComponent } from './load-session-on-refresh.component';

describe('LoadSessionOnRefreshComponent', () => {
  let component: LoadSessionOnRefreshComponent;
  let fixture: ComponentFixture<LoadSessionOnRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadSessionOnRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadSessionOnRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
