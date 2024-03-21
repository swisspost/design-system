import { Component } from '@angular/core';
import { VersionService } from '../common/version.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  templateUrl: 'layout-container.component.html',
  styleUrls: ['layout-container.component.scss'],
})
export class LayoutContainerComponent {
  public setFullwidthContainer: boolean = false;
  public versions$;
  public currentVersion$;

  constructor(
    private versionService: VersionService,
    public router: Router,
    private route: ActivatedRoute,
  ) {
    this.versions$ = this.versionService.versions;
    this.currentVersion$ = this.versionService.currentVersion;

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data),
      )
      .subscribe(data => {
        this.setFullwidthContainer = !!data.fullWidth;
      });
  }
}
