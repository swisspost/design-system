import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { VersionService } from './common/version.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public setFullwidthContainer: boolean = false;
  public title = 'app';
  public versions$;
  public currentVersion$;

  constructor(
    private versionService: VersionService,
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
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
