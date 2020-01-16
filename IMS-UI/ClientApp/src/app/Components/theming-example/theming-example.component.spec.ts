import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemingExampleComponent } from './theming-example.component';

describe('ThemingExampleComponent', () => {
  let component: ThemingExampleComponent;
  let fixture: ComponentFixture<ThemingExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemingExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemingExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
