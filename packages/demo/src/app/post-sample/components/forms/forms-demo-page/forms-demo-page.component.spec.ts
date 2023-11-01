import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDemoPageComponent } from './forms-demo-page.component';

describe('FormsDemoPageComponent', () => {
  let component: FormsDemoPageComponent;
  let fixture: ComponentFixture<FormsDemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormsDemoPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
