import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'consumer-app';
  public navigationRoutes: Route[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigationRoutes = this.router.config.filter(r => r.title);
  }
}
