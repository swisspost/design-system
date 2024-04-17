import { Component, Inject, LOCALE_ID } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-intranet-header-small',
  templateUrl: './intranet-header-demo-small-sidebar.component.html',
  styleUrls: ['../../intranet-layout.component.css'],
})
export class IntranetHeaderDemoSmallSidebarComponent {
  openedMenu = false;

  constructor(@Inject(LOCALE_ID) public language: string, private errorService: ErrorService) {
    // handle language for ngx-translate and for angular PIPE
    // Handle unexpected errors
    this.errorService.unexpectedErrorEvent.subscribe((response: HttpErrorResponse) => {
      console.error('Unexpected error', response);
    });
  }
}
