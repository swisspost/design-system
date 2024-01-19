import { Component } from '@angular/core';

const ngbLocalizationSample = require('!!raw-loader!./ngb-localization.sample.ts').default;

@Component({
  selector: 'app-ngb-localization',
  templateUrl: './ngb-localization.component.html',
})
export class NgbLocalizationComponent {
  ngbLocalizationSample = ngbLocalizationSample;
}
