import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DotNotificationDemoComponent } from './dot-notification-demo.component';

describe('DotNotificationDemoComponent', () => {
  let component: DotNotificationDemoComponent;
  let fixture: ComponentFixture<DotNotificationDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DotNotificationDemoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotNotificationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
