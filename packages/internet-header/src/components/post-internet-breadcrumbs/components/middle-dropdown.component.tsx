import { h } from '@stencil/core';
import { SvgIcon } from '../../../utils/svg-icon.component';
import { IBreadcrumbItem } from '../../../models/breadcrumbs.model';
import { MiddleLinks } from './middle-links.component';
import { translate } from '../../../services/language.service';

export const MiddleDropdown = (props: {
  items: IBreadcrumbItem[];
  dropdownOpen: boolean;
  clickHandler: (event?: MouseEvent) => void;
  focusable?: boolean;
}) => {
  return (
    <div class="middle-dropdown-container">
      <button
        class="middle-dropdown-button btn btn-blank"
        type="button"
        onClick={event => props.clickHandler(event)}
        tabindex={props.focusable === false ? '-1' : undefined}
      >
        <span class="visually-hidden">{translate('Open menu')}</span>
        <span aria-hidden="true">...</span>
      </button>
      <SvgIcon name="pi-arrow-down" classNames="rotate-270"></SvgIcon>
      {props.dropdownOpen ? (
        <nav aria-label={translate('Intermediary links')} class="middle-dropdown">
          <ul class="no-list">
            <MiddleLinks items={props.items} icons={false} focusable={props.focusable} />
          </ul>
        </nav>
      ) : null}
    </div>
  );
};
