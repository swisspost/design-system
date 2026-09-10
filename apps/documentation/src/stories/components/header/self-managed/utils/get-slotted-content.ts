import { Args } from '@storybook/web-components-vite';
import { nothing } from 'lit';
import { getSubComponentRenderers, SubComponentRenderers } from './get-sub-component-renderers';
import { isApplicationHeader } from './is-application-header';

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
    renderLocalNav,
    renderJobControls,
    renderMainnavigation,
  } = getSubComponentRenderers(customRenderers);

  const logo = renderLogo();

  const audience = args.targetGroup ? renderAudience(args) : nothing;

  const globalNavPrimary = args.globalNavPrimary && !args.jobs ? renderGlobalNavPrimary() : nothing;

  const globalNavSecondary = args.globalNavSecondary ? renderGlobalNavSecondary(args) : nothing;

  const globalLanguageMenu =
    args.languageMenu && !isApplicationHeader(args) ? renderLanguageMenu() : nothing;

  const login = args.isLoggedIn ? renderUserMenu() : renderLoginLink();
  const globalLogin = args.postLogin && !args.jobs ? login : nothing;

  const title = args.title !== '' ? renderTitle(args) : nothing;

  const sideNavTrigger = args.sideNav && args.title !== '' ? renderSideNavTrigger() : nothing;

  const localNav = args.localNav ? renderLocalNav(args) : nothing;
  const localControls = args.jobs ? renderJobControls() : localNav;

  const mainNavSlot = args.mainNav ? renderMainnavigation() : nothing;

  return [
    logo,
    audience,
    globalNavPrimary,
    globalNavSecondary,
    globalLanguageMenu,
    globalLogin,
    title,
    sideNavTrigger,
    localControls,
    mainNavSlot,
  ];
}
