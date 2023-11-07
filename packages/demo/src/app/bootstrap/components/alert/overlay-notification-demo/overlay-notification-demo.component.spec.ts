import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OverlayNotificationDemoComponent } from './overlay-notification-demo.component';

describe('OverlayNotificationDemoComponent', () => {
  let component: OverlayNotificationDemoComponent;
  let fixture: ComponentFixture<OverlayNotificationDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OverlayNotificationDemoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayNotificationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
