import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from 'ngx-highlightjs';

const ngbLocalizationSample = require('!!raw-loader!./ngb-localization.sample.ts').default;

@Component({
  selector: 'app-ngb-localization',
  templateUrl: './ngb-localization.component.html',
})
export class NgbLocalizationComponent {
  ngbLocalizationSample = ngbLocalizationSample;
}
