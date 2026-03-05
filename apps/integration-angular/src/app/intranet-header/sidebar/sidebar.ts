import { Component } from '@angular/core';
import { SwissPostIntranetHeaderComponent } from '@swisspost/design-system-intranet-header';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'post-sidebar',
  imports: [NgClass, RouterLink, SwissPostIntranetHeaderComponent],
  templateUrl: './sidebar.html'
})
export class Sidebar {
  openedMenu = false;
}
