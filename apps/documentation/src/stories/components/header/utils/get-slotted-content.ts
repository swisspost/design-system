import { renderJobControls } from '@root/src/stories/components/header/renderers';
import {
  getSubComponentRenderers,
  hasGlobalLogin,
  isApplicationHeader,
  SubComponentRenderers,
} from '@root/src/stories/components/header/utils';
import { Args } from '@storybook/web-components-vite';
import { nothing } from 'lit';

export function getSlottedContent(args: Args, customRenderers: SubComponentRenderers = {}) {
  const {
    renderLogo,
    renderAudience,
    renderGlobalNavPrimary,
    renderGlobalNavSecondary,
    renderLanguageMenu,
    renderUserMenu,
    renderLoginLink,
    renderTitle,
    renderSideNavTrigger,
    renderMicrositeControls,
    renderMainnavigation,
  } = getSubComponentRenderers(customRenderers);

  const logo = renderLogo();

  const audience = args.targetGroup ? renderAudience(args) : nothing;

  const globalNavPrimary = args.globalNavPrimary && !args.jobs ? renderGlobalNavPrimary() : nothing;

  const globalNavSecondary = args.globalNavSecondary ? renderGlobalNavSecondary(args) : nothing;

  const globalLanguageMenu =
    args.languageMenu && !isApplicationHeader(args) ? renderLanguageMenu() : nothing;

  const login = args.isLoggedIn ? renderUserMenu() : renderLoginLink();
  const globalLogin = hasGlobalLogin(args) ? login : nothing;

  const title = args.title !== '' ? renderTitle(args) : nothing;

  const sideNavTrigger = args.sideNav && args.title !== '' ? renderSideNavTrigger() : nothing;

  const micrositeControls = args.localNav ? renderMicrositeControls(args) : nothing;

  const mainNavSlot = args.mainNav ? renderMainnavigation() : nothing;

  const jobControls = args.jobs ? renderJobControls() : nothing;

  return [
    logo,
    audience,
    globalNavPrimary,
    globalNavSecondary,
    globalLanguageMenu,
    globalLogin,
    title,
    sideNavTrigger,
    micrositeControls,
    mainNavSlot,
    jobControls,
  ];
}
