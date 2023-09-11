/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { VersionService } from '../version.service';

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

  constructor(private route: ActivatedRoute, private versionService: VersionService) {
    this.urlChangeSubscription = this.route.url.subscribe(() => {
      const { dependencies } = this.versionService.localVersion;
      if (route.parent.snapshot.url[0].path === 'ng-bootstrap-samples') {
        this.dependency = 'ng-bootstrap';
        this.dependencyVersion = dependencies.get('@ng-bootstrap/ng-bootstrap').format('x');
        this.documentationBaseUrl = `https://ng-bootstrap.github.io${
          this.dependencyVersion === '14' ? '' : `/releases/${this.dependencyVersion}.x`
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

  ngOnDestroy() {
    this.urlChangeSubscription.unsubscribe();
  }
}
