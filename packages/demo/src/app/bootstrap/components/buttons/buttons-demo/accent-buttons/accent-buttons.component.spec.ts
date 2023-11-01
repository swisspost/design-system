import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccentButtonsComponent } from './accent-buttons.component';

describe('AccentButtonsComponent', () => {
  let component: AccentButtonsComponent;
  let fixture: ComponentFixture<AccentButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccentButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccentButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
