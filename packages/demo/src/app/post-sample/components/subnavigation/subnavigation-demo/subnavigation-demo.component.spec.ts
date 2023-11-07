import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubnavigationDemoComponent } from './subnavigation-demo.component';

describe('SubnavigationDemoComponent', () => {
  let component: SubnavigationDemoComponent;
  let fixture: ComponentFixture<SubnavigationDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SubnavigationDemoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnavigationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
