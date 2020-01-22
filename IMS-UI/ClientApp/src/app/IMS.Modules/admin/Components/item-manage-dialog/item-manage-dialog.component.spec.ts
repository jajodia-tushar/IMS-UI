import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemManageDialogComponent } from './item-manage-dialog.component';

describe('ItemAddDialogComponent', () => {
  let component: ItemManageDialogComponent;
  let fixture: ComponentFixture<ItemManageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemManageDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
