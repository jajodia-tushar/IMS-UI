import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDeactivateDialogComponent } from './item-deactivate-dialog.component';

describe('ItemDeactivateDialogComponent', () => {
  let component: ItemDeactivateDialogComponent;
  let fixture: ComponentFixture<ItemDeactivateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDeactivateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDeactivateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
