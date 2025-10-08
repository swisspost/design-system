import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PostTabs, PostTabItem, PostTabPanel } from '@swisspost/design-system-components-angular';

@Component({
  selector: 'tabs-page',
  templateUrl: './tabs.component.html',
  imports: [CommonModule, ReactiveFormsModule, PostTabs, PostTabItem, PostTabPanel],
  standalone: true,
})
export class TabsComponent {}
