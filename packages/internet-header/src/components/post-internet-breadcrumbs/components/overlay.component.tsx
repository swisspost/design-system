import { h } from '@stencil/core';
import { SvgIcon } from '../../../utils/svg-icon.component';
import { IBreadcrumbOverlay } from '../../../models/breadcrumbs.model';
import { FocusTrap } from './focus-trap.component';

const stopPropagation = (event: Event) => event.stopPropagation();

/**
 * Overlay implementation with focus trap according to
 * https://www.accessibility-developer-guide.com/examples/widgets/dialog/#modal-dialog
 *
 * @param props
 * @returns
 */
export const OverlayComponent = (props: {
  overlay: IBreadcrumbOverlay;
  onClick: () => void;
  onKeyDown?: (event?: KeyboardEvent) => void;
  iFrameRef: (element: HTMLIFrameElement) => void;
  overlayRef: (element: HTMLElement | undefined) => void;
  closeButtonText: string;
}) => (
  <div class="overlay" onClick={props.onClick} onKeyDown={props.onKeyDown} ref={props.overlayRef}>
    <div class="container" role="dialog">
      <FocusTrap>
        <div
          class="overlay-container"
          tabindex="-1" /* For initial focus */
          role="document"
          onClick={stopPropagation}
        >
          <button
            class={`overlay-close btn-blank d-inline-flex align-items-center nav-link ${props.overlay.id}`}
            onClick={props.onClick}
          >
            <span class="visually-hidden">
              {/* {state.localizedConfig.header.translations.closeButtonText} */}
              {props.closeButtonText}
            </span>
            <SvgIcon name="pi-close"></SvgIcon>
          </button>
          <iframe
            src={props.overlay.target}
            frameborder="0"
            class="frame"
            ref={props.iFrameRef}
          ></iframe>
        </div>
      </FocusTrap>
      <div class="loader-wrapper">
        <div class="loader"></div>
      </div>
    </div>
  </div>
);
