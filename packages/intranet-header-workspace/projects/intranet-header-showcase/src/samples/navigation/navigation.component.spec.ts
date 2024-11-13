import 'jasmine';
import { TestBed } from '@angular/core/testing';
import { SamplesNavigationComponent } from './navigation.component';

describe('SamplesNavigationComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SamplesNavigationComponent],
    }).compileComponents();
  });

  it(`should have as title 'intranet-header-showcase'`, () => {
    const fixture = TestBed.createComponent(SamplesNavigationComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('intranet-header-showcase');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(SamplesNavigationComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'intranet-header-showcase app is running!',
    );
  });
});
