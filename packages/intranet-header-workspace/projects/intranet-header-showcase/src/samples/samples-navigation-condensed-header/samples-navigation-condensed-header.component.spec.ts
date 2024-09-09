import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplesNavigationCondensedHeaderComponent } from './samples-navigation-condensed-header.component';

describe('SamplesNavigationCondensedHeaderComponent', () => {
  let component: SamplesNavigationCondensedHeaderComponent;
  let fixture: ComponentFixture<SamplesNavigationCondensedHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamplesNavigationCondensedHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SamplesNavigationCondensedHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
