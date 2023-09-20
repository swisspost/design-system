import { Component } from '@angular/core';

const codeTemplate =
  require('!!raw-loader!../spinner-mini-demo/spinner-mini-demo.component.html').default;
const spinner = `<div class="position-relative">
    <div class="spinner-bg">
        <div class="loading-modal">
            <div class="loader m-auto"></div>
        </div>
    </div>
</div>`;
const spinnerSmall = `<div class="position-relative">
  <div class="spinner-bg">
      <div class="loading-modal">
          <div class="loader loader-sm m-auto"></div>
      </div>
  </div>
</div>`;

@Component({
  selector: 'app-spinner-demo-page',
  templateUrl: './spinner-demo-page.component.html',
})
export class SpinnerDemoPageComponent {
  codeTemplate = codeTemplate;
  spinner = spinner;
  spinnerSmall = spinnerSmall;
}
