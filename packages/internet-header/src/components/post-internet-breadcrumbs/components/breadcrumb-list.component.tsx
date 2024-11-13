import { h } from '@stencil/core';
import { IBreadcrumbItem } from '../../../models/breadcrumbs.model';
import { SvgIcon } from '../../../utils/svg-icon.component';
import { MiddleDropdown } from './middle-dropdown.component';
import { MiddleLinks } from './middle-links.component';

export const BreadcrumbList = (props: {
  items: IBreadcrumbItem[];
  dropdownOpen?: boolean;
  isConcatenated?: boolean;
  clickHandler: (event?: MouseEvent) => void;
  lastItemRef?: (element: HTMLElement | undefined) => void;
  focusable?: boolean;
}) => {
  const homeItem = props.items[0];
  const lastItem = props.items[props.items.length - 1];

  return (
    <ol class="no-list breadcrumbs-list">
      <li>
        <a
          class="home-link nav-link"
          href={homeItem.url}
          tabindex={props.focusable === false ? '-1' : undefined}
        >
          <span class="visually-hidden">{homeItem.text}</span>
          <SvgIcon name="pi-home" />
        </a>
        <SvgIcon name="pi-arrow-down" classNames="rotate-270"></SvgIcon>
      </li>
      {props.isConcatenated ? (
        <li>
          <MiddleDropdown
            items={props.items}
            dropdownOpen={props.dropdownOpen ?? false}
            clickHandler={e => props.clickHandler(e)}
            focusable={props.focusable}
          />
        </li>
      ) : (
        <MiddleLinks items={props.items} icons={true} focusable={props.focusable} />
      )}
      <li>
        {/* For some reason, ref is executed twice when resizing above threshold and the second time around, el is null. Thereafter the ellipsis detection does not work anymore due to the null reference. */}
        <a
          class="last-link nav-link"
          href={lastItem.url}
          tabindex={props.focusable === false ? '-1' : undefined}
          ref={el => (props.lastItemRef !== undefined ? props.lastItemRef(el) : null)}
        >
          {lastItem.text}
        </a>
      </li>
    </ol>
  );
};
