import { Component } from '@angular/core';
import { SwissPostIntranetHeaderComponent } from '@swisspost/design-system-intranet-header';
import { NgClass } from '@angular/common';

@Component({
  selector: 'post-search-and-sidebar',
  imports: [NgClass, SwissPostIntranetHeaderComponent],
  templateUrl: './search-and-sidebar.html',
})
export class SearchAndSidebar {
  openedMenu = false;
}
