import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IntranetHeaderDemoBigSidebarComponent } from './intranet-header-demo-big-sidebar.component';
import { ErrorService } from '../../services/error.service';
import { RouterModule } from '@angular/router';

describe('IntranetHeaderBigComponent', () => {
  let component: IntranetHeaderDemoBigSidebarComponent;
  let fixture: ComponentFixture<IntranetHeaderDemoBigSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
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
