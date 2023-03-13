import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import packageJSON from 'package.json';
import versions from '../assets/versions.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public setFullwidthContainer: boolean = false;
  public title = 'app';
  public version = packageJSON.version;
  public versions = versions;

  constructor(public router: Router, private route: ActivatedRoute) {}

  public get currentVersionTitle() {
    return this.versions.find(v => v.version === this.version).title;
  }

  ngOnInit() {
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
