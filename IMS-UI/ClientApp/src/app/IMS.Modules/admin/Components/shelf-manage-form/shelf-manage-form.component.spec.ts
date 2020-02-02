import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfManageFormComponent } from './shelf-manage-form.component';

describe('ShelfManageFormComponent', () => {
  let component: ShelfManageFormComponent;
  let fixture: ComponentFixture<ShelfManageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfManageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfManageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
