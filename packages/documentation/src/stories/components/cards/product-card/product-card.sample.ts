import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'post-product-cards',
  templateUrl: './post-product-cards.component.html',
})
export class PostProductCardsComponent implements OnInit, OnDestroy {
  resize$ = new Subject<void>();

  ngOnInit() {
    this.resize$
      .asObservable()
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.syncHeight();
      });

    this.resize$.next();
  }

  ngOnDestroy() {
    this.resize$.complete();
  }

  syncHeight() {
    const nodes: NodeListOf<HTMLElement> = document.querySelectorAll('[data-sync-height-with]');

    const heightByGroup = new Map<string, number>();
    nodes.forEach(node => {
      const group = node.getAttribute('data-sync-height-with');
      const groupHeight = heightByGroup.get(group);
      const nodeHeight = node.offsetHeight;

      if (!groupHeight || nodeHeight > groupHeight) {
        heightByGroup.set(group, nodeHeight);
      }
    });

    heightByGroup.forEach((height, group) => {
      const groupNodes: NodeListOf<HTMLElement> = document.querySelectorAll(
        `[data-sync-height-with="${group}"]`,
      );

      groupNodes.forEach(node => {
        node.style.height = `${height}px`;
      });
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize$.next();
  }
}
