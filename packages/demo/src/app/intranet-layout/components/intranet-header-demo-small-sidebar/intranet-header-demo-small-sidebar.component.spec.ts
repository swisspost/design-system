import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IntranetHeaderDemoSmallSidebarComponent } from './intranet-header-demo-small-sidebar.component';
import { ErrorService } from '../../services/error.service';

describe('IntranetHeaderSmallComponent', () => {
  let component: IntranetHeaderDemoSmallSidebarComponent;
  let fixture: ComponentFixture<IntranetHeaderDemoSmallSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IntranetHeaderDemoSmallSidebarComponent],
      providers: [ErrorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntranetHeaderDemoSmallSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
