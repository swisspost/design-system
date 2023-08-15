/*
 * Copyright 2023 by Swiss Post, Information Technology
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import packageJSON from 'package.json';
import { map, Observable, shareReplay } from 'rxjs';

interface PackageVersionDetails {
  title: string;
  version: string;
  description: string;
  url: string;
  dependencies?: Record<string, string>;
}

class VersionNumber {
  full: string;

  constructor(version: string) {
    this.full = version;
  }

  public format(format: 'x' | 'x.x' | 'x.x.x'): string {
    return format
      .split('.')
      .map((_, i) => this.full.split('.')[i])
      .join('.');
  }
}

class PackageVersion {
  title: string;
  version: VersionNumber;
  description: string;
  url: string;
  dependencies?: ReadonlyMap<string, VersionNumber>;

  constructor({ title, version, description, url, dependencies }: PackageVersionDetails) {
    this.title = title;
    this.url = url;
    this.description = description;
    this.version = new VersionNumber(version);
    this.dependencies = dependencies
      ? new Map(
          Object.entries(dependencies).map(([packageName, version]) => {
            return [packageName, new VersionNumber(version)];
          }),
        )
      : null;
  }

  get isCurrent(): boolean {
    return this.version.full === packageJSON.version;
  }
}

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  public get currentVersion(): Observable<PackageVersion> {
    return this.versions.pipe(map(versions => versions.find(v => v.isCurrent)));
  }

  public get versions(): Observable<PackageVersion[]> {
    return this.http
      .get<PackageVersionDetails[]>('https://design-system.post.ch/assets/versions.json')
      .pipe(
        map(versions => versions.map(v => new PackageVersion(v))),
        shareReplay(1),
      );
  }

  public get localVersion() {
    return new PackageVersion({ ...packageJSON, url: '/', title: 'Local version' });
  }

  constructor(private http: HttpClient) {}
}
