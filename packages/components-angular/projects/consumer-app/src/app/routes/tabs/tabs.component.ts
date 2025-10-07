import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostComponentsModule } from 'components';

@Component({
  selector: 'tabs-page',
  templateUrl: './tabs.component.html',
  imports: [CommonModule, ReactiveFormsModule, PostComponentsModule],
})
export class TabsComponent {}
