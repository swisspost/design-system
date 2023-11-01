import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComplexCardDemoComponent } from './complex-card-demo.component';

describe('ComplexCardDemoComponent', () => {
  let component: ComplexCardDemoComponent;
  let fixture: ComponentFixture<ComplexCardDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ComplexCardDemoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexCardDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
