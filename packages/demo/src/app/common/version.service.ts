/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

import { Injectable } from '@angular/core';
import packageJSON from 'package.json';
import versions from '../../assets/versions.json';

interface PackageVersionDetails {
  title: string;
  version: string;
  description: string;
  url: string;
  dependencies: Record<string, string>;
}

class VersionNumber {
  full: string;

  constructor(version: string) {
    this.full = version;
  }

  public format(format: 'x' | 'x.x' | 'x.x.x'): string {
    return format.split('.').map((_, i) => this.full.split('.')[i]).join('.');
  }
}

class PackageVersion {
  title: string;
  version: VersionNumber;
  description: string;
  url: string;
  dependencies: ReadonlyMap<string, VersionNumber>;

  constructor({ title, version, description, url, dependencies }: PackageVersionDetails) {
    this.url = url;
    this.description = description;
    this.version = new VersionNumber(version);
    this.title = title + (this.isLatest ? ' (latest)' : '');
    this.dependencies = new Map(Object.entries(dependencies).map(([ packageName, version ]) => {
        return [ packageName, new VersionNumber(version) ];
      }),
    );
  }

  get isLatest(): boolean {
    return this.version.full === packageJSON.version;
  }
}

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  public allVersions: PackageVersion[] = versions.map(v => new PackageVersion(v));

  public get latestVersion(): PackageVersion {
    return this.allVersions.find(v => v.isLatest);
  }
}
