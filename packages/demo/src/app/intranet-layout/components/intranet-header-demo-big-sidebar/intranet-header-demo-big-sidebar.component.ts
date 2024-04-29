import { Component, Inject, LOCALE_ID } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intranet-header-big',
  templateUrl: './intranet-header-demo-big-sidebar.component.html',
  styleUrls: ['../../intranet-layout.component.css'],
})
export class IntranetHeaderDemoBigSidebarComponent {
  openedMenu = false;
  appTitle = 'testwebapp';
  initialLanguage = 'de';

  constructor(
    @Inject(LOCALE_ID) public language: string,
    private location: Location,

    private errorService: ErrorService,
    private router: Router,
  ) {
    // handle language for ngx-translate and for angular PIPE
    // Handle unexpected errors
    this.errorService.unexpectedErrorEvent.subscribe((response: HttpErrorResponse) => {
      console.error('Unexpected error', response);
    });

    router.events.subscribe(url => {
      this.openedMenu = false;
    });
  }

  public toggleMenu() {
    this.openedMenu = !this.openedMenu;
  }
}
