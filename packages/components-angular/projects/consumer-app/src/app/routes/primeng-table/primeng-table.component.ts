import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponentsModule } from 'components';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'primeng-table-page',
  templateUrl: './primeng-table.component.html',
  imports: [CommonModule, PostComponentsModule, TableModule, CalendarModule],
})
export class PrimengTableComponent implements OnInit {
  products: object[];

  constructor() {
    this.products = [];
  }

  ngOnInit() {
    this.products = [
      { code: 'P1', name: 'Laptop', category: 'Electronics', quantity: 10, date: '09/13/2015' },
      { code: 'P2', name: 'Mouse', category: 'Electronics', quantity: 25, date: '02/20/2014' },
      { code: 'P3', name: 'Keyboard', category: 'Electronics', quantity: 5, date: '02/06/2016' },
    ];
  }
  clear(table: any) {
    table.clear();
  }
}
