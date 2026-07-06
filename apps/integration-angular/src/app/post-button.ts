import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  PostIcon,
  PostTooltip,
  PostTooltipTrigger,
} from '@swisspost/design-system-components-angular';

let buttonIdCounter = 0;

@Component({
  selector: 'post-button',
  template: `
    <ng-template #contentTpl>
      <ng-content />
    </ng-template>
    @if (iconOnly) {
      <post-tooltip-trigger [for]="tooltipId">
        <button [type]="type" [disabled]="disabled" [class]="buttonClass">
          <post-icon [name]="iconOnly"></post-icon>
        </button>
        <post-tooltip [id]="tooltipId"
          ><ng-container *ngTemplateOutlet="contentTpl"
        /></post-tooltip>
      </post-tooltip-trigger>
    } @else {
      <button [type]="type" [disabled]="disabled" [class]="buttonClass">
        @if (iconLeft) {
          <post-icon [name]="iconLeft"></post-icon>
        }
        <ng-container *ngTemplateOutlet="contentTpl" />
        @if (iconRight) {
          <post-icon [name]="iconRight"></post-icon>
        }
      </button>
    }
  `,
  imports: [PostIcon, PostTooltipTrigger, PostTooltip, NgTemplateOutlet],
})
export class PostButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'link' = 'secondary';
  @Input() disabled: boolean = false;
  @Input() iconLeft: string | null = null;
  @Input() iconRight: string | null = null;
  @Input() iconOnly: string | null = null;

  tooltipId: string = `post-button-icon-only-tooltip-${buttonIdCounter}`;

  get buttonId(): string {
    buttonIdCounter++;
    return `post-button-icon-only-tooltip-${buttonIdCounter}`;
  }

  get buttonClass(): string {
    const classes = ['btn'];
    switch (this.variant) {
      case 'primary':
        classes.push('btn-primary');
        break;
      case 'secondary':
        classes.push('btn-secondary');
        break;
      case 'tertiary':
        classes.push('btn-tertiary');
        break;
      case 'link':
        classes.push('btn-link');
        break;
      default:
        classes.push('btn-secondary');
        break;
    }
    return classes.join(' ');
  }
}
