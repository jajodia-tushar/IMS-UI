import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfManagementComponent } from './shelf-management.component';

describe('ShelfManagementComponent', () => {
  let component: ShelfManagementComponent;
  let fixture: ComponentFixture<ShelfManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
