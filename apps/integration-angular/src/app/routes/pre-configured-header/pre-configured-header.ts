import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import testConfiguration from '@swisspost/internet-header/dist/swisspost-internet-header/assets/config/test-configuration.json';
import { defineCustomElements } from '@swisspost/internet-header/loader';

void defineCustomElements();

@Component({
  selector: 'pre-configured-header',
  templateUrl: './pre-configured-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PreConfiguredHeader {
  readonly configSource = inject(ActivatedRoute).snapshot.data['configSource'] as 'script' | 'api';

  constructor() {
    if (this.configSource === 'script') this.addHeaderData();
  }

  // Angular drops `<script>` tags from templates, and the header reads the config as it loads,
  // so the tag is added before the template renders the header.
  private addHeaderData() {
    const document = inject(DOCUMENT);
    const script = document.createElement('script');
    script.id = 'PPM_HEADER_DATA';
    script.type = 'application/json';
    script.textContent = JSON.stringify(testConfiguration);
    document.head.append(script);

    inject(DestroyRef).onDestroy(() => script.remove());
  }
}
