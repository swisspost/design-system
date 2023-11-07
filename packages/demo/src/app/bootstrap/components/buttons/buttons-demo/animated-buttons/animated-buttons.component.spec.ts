import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedButtonsComponent } from './animated-buttons.component';

describe('AnimatedButtonsComponent', () => {
  let component: AnimatedButtonsComponent;
  let fixture: ComponentFixture<AnimatedButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimatedButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
