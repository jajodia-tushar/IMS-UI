import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfDeactivateDialogComponent } from './shelf-deactivate-dialog.component';

describe('ShelfDeactivateDialogComponent', () => {
  let component: ShelfDeactivateDialogComponent;
  let fixture: ComponentFixture<ShelfDeactivateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfDeactivateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfDeactivateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
