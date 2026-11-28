import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { defineCustomElements } from '@swisspost/internet-header/loader';

defineCustomElements();

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppHeader {}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFooter {}
