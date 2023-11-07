import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-form-check-demo',
  templateUrl: './form-check-demo.component.html',
})
export class FormCheckDemoComponent implements AfterViewInit {
  @ViewChildren('indeterminate') indeterminateChecks: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.indeterminateChecks.forEach(check => (check.nativeElement.indeterminate = true));
  }
}
