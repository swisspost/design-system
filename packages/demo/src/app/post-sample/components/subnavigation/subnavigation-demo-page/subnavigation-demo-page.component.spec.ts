import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubnavigationDemoPageComponent } from './subnavigation-demo-page.component';

describe('SubnavigationDemoPageComponent', () => {
  let component: SubnavigationDemoPageComponent;
  let fixture: ComponentFixture<SubnavigationDemoPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SubnavigationDemoPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnavigationDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
