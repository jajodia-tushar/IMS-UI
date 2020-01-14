import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemManageFormComponent } from './item-manage-form.component';

describe('ItemManageFormComponent', () => {
  let component: ItemManageFormComponent;
  let fixture: ComponentFixture<ItemManageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemManageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
