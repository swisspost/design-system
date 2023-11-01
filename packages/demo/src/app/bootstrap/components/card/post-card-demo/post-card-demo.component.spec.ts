import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PostCardDemoComponent } from './post-card-demo.component';

describe('PostCardDemoComponent', () => {
  let component: PostCardDemoComponent;
  let fixture: ComponentFixture<PostCardDemoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PostCardDemoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
