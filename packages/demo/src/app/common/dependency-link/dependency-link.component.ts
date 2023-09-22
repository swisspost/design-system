/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, from, Subscription, switchMap } from 'rxjs';
import { VersionService } from '../version.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-dependency-link',
  templateUrl: 'dependency-link.component.html',
})
export class DependencyLinkComponent implements OnDestroy {
  @Input() documentationPath: string;
  @Input() documentationPaths: Record<string, string>;
  dependency: string;
  dependencyVersion: string;
  documentationBaseUrl: string;
  urlChangeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private versionService: VersionService,
    private http: HttpClient,
  ) {
    this.urlChangeSubscription = combineLatest([
      this.getLatestVersion('@ng-bootstrap/ng-bootstrap'),
      this.route.url,
    ]).subscribe(([ngBootStrapLatestVersion, _]) => {
      const { dependencies } = this.versionService.localVersion;
      const ngBootStrapLatestMajorVersion = ngBootStrapLatestVersion.split('.')[0];

      if (route.parent.snapshot.url[0].path === 'ng-bootstrap-samples') {
        this.dependency = 'ng-bootstrap';
        this.dependencyVersion = dependencies.get('@ng-bootstrap/ng-bootstrap').format('x');
        this.documentationBaseUrl = `https://ng-bootstrap.github.io${
          this.dependencyVersion === ngBootStrapLatestMajorVersion
            ? ''
            : `/releases/${this.dependencyVersion}.x`
        }/#/`;
      } else {
        this.dependency = 'Bootstrap';
        this.dependencyVersion = dependencies.get('bootstrap').format('x.x');
        this.documentationBaseUrl = `https://getbootstrap.com/docs/${this.dependencyVersion}/`;
      }

      if (!this.documentationPath) {
        this.documentationPath = `components/${route.snapshot.url[0].path}`;
      }
    });
  }

  private getLatestVersion(packageName: string): Observable<string> {
    const url = `https://registry.npmjs.org/${packageName}/latest`;

    const cachedResponse = caches
      .match(url)
      .then(response => (response !== undefined ? response : fetch(url)))
      .then(response => {
        caches.open('npm').then(cache => {
          void cache.put(url, response);
        });
        return response.clone();
      });

    return from(cachedResponse).pipe(
      switchMap(response => response.json()),
      map(packageConfig => packageConfig.version),
    );
  }

  ngOnDestroy() {
    this.urlChangeSubscription.unsubscribe();
  }
}
