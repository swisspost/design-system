import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSizesComponent } from './button-sizes.component';

describe('ButtonSizesComponent', () => {
  let component: ButtonSizesComponent;
  let fixture: ComponentFixture<ButtonSizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonSizesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
