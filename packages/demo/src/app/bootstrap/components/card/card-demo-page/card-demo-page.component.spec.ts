import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardDemoPageComponent } from './card-demo-page.component';

describe('CardDemoPageComponent', () => {
  let component: CardDemoPageComponent;
  let fixture: ComponentFixture<CardDemoPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CardDemoPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
