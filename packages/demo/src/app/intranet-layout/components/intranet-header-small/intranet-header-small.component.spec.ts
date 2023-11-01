import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IntranetHeaderSmallComponent } from './intranet-header-small.component';
import { ErrorService } from '../../services/error.service';

describe('IntranetHeaderSmallComponent', () => {
  let component: IntranetHeaderSmallComponent;
  let fixture: ComponentFixture<IntranetHeaderSmallComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IntranetHeaderSmallComponent],
      providers: [ErrorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntranetHeaderSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
