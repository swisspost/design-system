/*
 * Copyright 2021 by Swiss Post, Information Technology
 */

import {Component} from '@angular/core';

@Component({
  selector: 'app-responsive-sizing-demo',
  templateUrl: 'responsive-sizing-demo.component.html',
})
export class ResponsiveSizingDemoComponent {
  get highlightManualDemo(): string {
    return `<div class="p-regular p-lg-big"></div>`;
  }

  get highlightAutomaticDemo(): string {
    return `<div class="p-large-r"></div>`;
  }
}
