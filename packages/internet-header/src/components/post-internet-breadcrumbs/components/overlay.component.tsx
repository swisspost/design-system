import { h } from '@stencil/core';
import { SvgIcon } from '../../../utils/svg-icon.component';
import { state } from '../../../data/store';
import { IBreadcrumbOverlay } from '../../../models/breadcrumbs.model';
import { FocusTrap } from './focus-trap.component';

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
  overlayRef: (element: HTMLElement) => void;
}) => (
  <div
    class="overlay"
    onClick={() => props.onClick()}
    onKeyDown={e => props.onKeyDown(e)}
    ref={e => props.overlayRef(e)}
  >
    <div class="container" role="dialog">
      <FocusTrap>
        <div
          class="overlay-container"
          tabindex="-1" /* For initial focus */
          role="document"
          onClick={e => e.stopPropagation()}
        >
          <button
            class={`overlay-close btn-blank d-inline-flex align-items-center nav-link ${props.overlay.id}`}
            onClick={() => props.onClick()}
          >
            <span class="visually-hidden">
              {state.localizedConfig.header.translations.closeButtonText}
            </span>
            <SvgIcon name="pi-close"></SvgIcon>
          </button>
          <iframe
            src={props.overlay.target}
            frameborder="0"
            class="frame"
            ref={e => props.iFrameRef(e)}
          ></iframe>
        </div>
      </FocusTrap>
      <div class="loader-wrapper">
        <div class="loader"></div>
      </div>
    </div>
  </div>
);
