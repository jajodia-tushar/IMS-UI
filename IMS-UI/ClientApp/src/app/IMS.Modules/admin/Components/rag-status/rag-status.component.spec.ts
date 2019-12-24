import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RagStatusComponent } from './rag-status.component';

describe('RagStatusComponent', () => {
  let component: RagStatusComponent;
  let fixture: ComponentFixture<RagStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RagStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RagStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
