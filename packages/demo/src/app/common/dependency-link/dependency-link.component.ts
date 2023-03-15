/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VersionService } from '../version.service';

enum Dependency {
  Bootstrap = 'Bootstrap',
  NgBootstrap = 'ng-bootstrap',
}

@Component({
  selector: 'app-dependency-link',
  templateUrl: 'dependency-link.component.html'
})
export class DependencyLinkComponent {
  @Input() private documentationPath: string;
  dependency: Dependency | null;

  constructor(
    private route: ActivatedRoute,
    private versionService: VersionService
  ) {
    this.route.url
      .subscribe(() => {
        switch (route.parent.snapshot.url[0].path) {
          case 'bootstrap-samples':
            this.dependency = Dependency.Bootstrap;
            break;
          case 'ng-bootstrap-samples':
            this.dependency = Dependency.NgBootstrap;
            break;
          default:
            return null;
        }

        if (!this.documentationPath){
          this.documentationPath = `components/${route.snapshot.url[0].path}`;
        }
      });
  }

  get dependencyVersion(): string {
    const dependencies = this.versionService.latestVersion.dependencies;
    switch (this.dependency) {
      case Dependency.Bootstrap:
        return dependencies.get('bootstrap').format('x.x');
      case Dependency.NgBootstrap:
        return dependencies.get('@ng-bootstrap/ng-bootstrap').format('x');
      default:
        return null;
    }
  }

  get documentationUrl(): string {
    switch (this.dependency) {
      case Dependency.Bootstrap: {
        const version = this.dependencyVersion;
        return `https://getbootstrap.com/docs/${version}/${this.documentationPath}`;
      }
      case Dependency.NgBootstrap: {
        const version = this.dependencyVersion;
        return `https://ng-bootstrap.github.io${version === '14' ? '' : `/releases/${version}.x`}/#/${this.documentationPath}`;
      }
      default:
        return null;
    }
  }
}
