import { h } from '@stencil/core';
import { SvgIcon } from '../../../utils/svg-icon.component';
import { IBreadcrumbItem } from '../../../models/breadcrumbs.model';

export const MiddleLinks = (props: {
  items: IBreadcrumbItem[];
  icons?: boolean;
  focusable?: boolean;
}) => {
  return props.items.slice(1, -1).map(item => (
    <li key={item.url}>
      <a href={item.url} class="nav-link" tabindex={props.focusable === false ? '-1' : undefined}>
        <span>{item.text}</span>
      </a>
      {props.icons ? <SvgIcon name="pi-arrow-down" classNames="rotate-270"></SvgIcon> : null}
    </li>
  ));
};
