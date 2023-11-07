import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IntranetHeaderBigComponent } from './intranet-header-big.component';
import { ErrorService } from '../../services/error.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('IntranetHeaderBigComponent', () => {
  let component: IntranetHeaderBigComponent;
  let fixture: ComponentFixture<IntranetHeaderBigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [IntranetHeaderBigComponent],
      providers: [ErrorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntranetHeaderBigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
