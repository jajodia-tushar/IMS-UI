import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfManageDialogComponent } from './shelf-manage-dialog.component';

describe('ShelfManageDialogComponent', () => {
  let component: ShelfManageDialogComponent;
  let fixture: ComponentFixture<ShelfManageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfManageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
