import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeader } from './admin-header.component';

describe('SidenavComponent', () => {
  let component: AdminHeader;
  let fixture: ComponentFixture<AdminHeader>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminHeader]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
