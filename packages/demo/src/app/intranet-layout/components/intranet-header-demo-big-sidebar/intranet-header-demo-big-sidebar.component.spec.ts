import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IntranetHeaderDemoBigSidebarComponent } from './intranet-header-demo-big-sidebar.component';
import { ErrorService } from '../../services/error.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('IntranetHeaderBigComponent', () => {
  let component: IntranetHeaderDemoBigSidebarComponent;
  let fixture: ComponentFixture<IntranetHeaderDemoBigSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [IntranetHeaderDemoBigSidebarComponent],
      providers: [ErrorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntranetHeaderDemoBigSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
