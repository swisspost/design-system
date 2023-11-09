import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextualButtonsComponent } from './contextual-buttons.component';

describe('ContextualButtonsComponent', () => {
  let component: ContextualButtonsComponent;
  let fixture: ComponentFixture<ContextualButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContextualButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextualButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
