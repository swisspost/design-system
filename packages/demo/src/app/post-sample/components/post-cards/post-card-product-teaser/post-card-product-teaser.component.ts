import { Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

interface IElementMap {
  [key: string]: HTMLElement[];
}

@Component({
  selector: 'app-card-product-teaser',
  templateUrl: './post-card-product-teaser.component.html',
})
export class PostCardProductTeaserComponent implements OnInit {
  heightSyncedMap: IElementMap = {};
  resize$ = new Subject<void>();

  ngOnInit() {
    this.resize$.pipe(debounceTime(300)).subscribe(() => {
      this.syncHeight();
    });
    this.resize$.next();
  }

  syncHeight() {
    const nodes = document.querySelectorAll<HTMLElement>('[data-sync-height-with]');
    const nodeArray: HTMLElement[] = Array.from(nodes);
    const heightSyncedMap = nodeArray.reduce((map, element) => {
      const group = element.getAttribute('data-sync-height-with');
      if (!map[group]) {
        map[group] = [];
      }
      map[group].push(element);
      return map;
    }, {} as IElementMap);

    Object.values(heightSyncedMap).forEach(group => {
      group.forEach(element => (element.style.height = 'auto'));
      const heights = group.map(element => element.offsetHeight);
      const max = Math.max.apply(null, heights);
      group.forEach(element => {
        if (element.offsetHeight < max) {
          element.style.height = `${max}px`;
        }
      });
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize$.next();
  }
}
