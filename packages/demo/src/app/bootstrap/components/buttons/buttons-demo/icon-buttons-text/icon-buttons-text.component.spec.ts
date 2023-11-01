import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconButtonsTextComponent } from './icon-buttons-text.component';

describe('IconButtonsTextComponent', () => {
  let component: IconButtonsTextComponent;
  let fixture: ComponentFixture<IconButtonsTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconButtonsTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconButtonsTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
