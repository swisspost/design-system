import { renderAudience } from '../renderers/audience';
import { renderGlobalNavPrimary } from '../renderers/global-nav-primary';
import { renderGlobalNavSecondary } from '../renderers/global-nav-secondary';
import { renderJobControls } from '../renderers/job-controls';
import { renderLanguageMenu } from '../renderers/language-menu';
import { renderLoginLink } from '../renderers/login-link';
import { renderLogo } from '../renderers/logo';
import { renderMainnavigation } from '../renderers/main-navigation';
import { renderLocalNav } from '../renderers/local-nav';
import { renderSideNavTrigger, renderSideNavigation } from '../renderers/side-navigation';
import { renderTitle } from '../renderers/title';
import { renderUserMenu } from '../renderers/user-menu';

const defaultRenderers = {
  renderAudience,
  renderGlobalNavPrimary,
  renderGlobalNavSecondary,
  renderJobControls,
  renderLanguageMenu,
  renderLoginLink,
  renderLogo,
  renderMainnavigation,
  renderLocalNav,
  renderSideNavTrigger,
  renderSideNavigation,
  renderTitle,
  renderUserMenu,
};

export type SubComponentRenderers = Partial<typeof defaultRenderers>;

export function getSubComponentRenderers(
  customRenderers: SubComponentRenderers,
): Required<SubComponentRenderers> {
  return { ...defaultRenderers, ...customRenderers };
}
