import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvertedButtonsComponent } from './inverted-buttons.component';

describe('InvertedButtonsComponent', () => {
  let component: InvertedButtonsComponent;
  let fixture: ComponentFixture<InvertedButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvertedButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvertedButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
