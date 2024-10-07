import { Component } from '@angular/core';

interface PostSize {
  name: string;
  size_pixel: number;
  size_rem: number;
  implemented: PostSizeImplementation;
  equivalent: number;
}

enum PostSizeImplementation {
  Pixel,
  Rem,
}

const heightWidth = `<div class="d-block bg-primary w-bigger-giant h-small-regular"></div>`;
const paddingMargin = `<div class="bg-primary d-inline-block">
    <div class="bg-white d-inline-block p-16 m-8 ms-56">Text</div>
</div>`;

@Component({
  selector: 'app-sizing-demo-page',
  templateUrl: './sizing-demo-page.component.html',
})
export class SizingDemoPageComponent {
  heightWidth = heightWidth;
  paddingMargin = paddingMargin;

  sizes: PostSize[];
  postSizeImplementationPixel: PostSizeImplementation = PostSizeImplementation.Pixel;

  constructor() {
    this.sizes = [
      {
        name: 'hair',
        size_pixel: 1,
        size_rem: 0.0625,
        implemented: PostSizeImplementation.Pixel,
        equivalent: 0,
      },
      {
        name: 'line',
        size_pixel: 2,
        size_rem: 0.125,
        implemented: PostSizeImplementation.Pixel,
        equivalent: 0,
      },
      {
        name: 'micro',
        size_pixel: 4,
        size_rem: 0.25,
        implemented: PostSizeImplementation.Rem,
        equivalent: 1,
      },
      {
        name: 'mini',
        size_pixel: 8,
        size_rem: 0.5,
        implemented: PostSizeImplementation.Rem,
        equivalent: 2,
      },
      {
        name: 'small-regular',
        size_pixel: 12,
        size_rem: 0.75,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'regular',
        size_pixel: 16,
        size_rem: 1,
        implemented: PostSizeImplementation.Rem,
        equivalent: 3,
      },
      {
        name: 'small-large',
        size_pixel: 20,
        size_rem: 1.25,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'large',
        size_pixel: 24,
        size_rem: 1.5,
        implemented: PostSizeImplementation.Rem,
        equivalent: 4,
      },
      {
        name: 'big',
        size_pixel: 32,
        size_rem: 2,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'bigger-big',
        size_pixel: 40,
        size_rem: 2.5,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'small-huge',
        size_pixel: 48,
        size_rem: 3,
        implemented: PostSizeImplementation.Rem,
        equivalent: 5,
      },
      {
        name: 'huge',
        size_pixel: 56,
        size_rem: 3.5,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'giant',
        size_pixel: 80,
        size_rem: 5,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
      {
        name: 'bigger-giant',
        size_pixel: 112,
        size_rem: 7,
        implemented: PostSizeImplementation.Rem,
        equivalent: 0,
      },
    ];
  }
}
