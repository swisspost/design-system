// Per-component imports keep the shell bundle small, as the package index
// registers every component.
import { defineCustomElement as definePostCollapsible } from '@swisspost/design-system-components/components/post-collapsible.js';
import { defineCustomElement as definePostCollapsibleTrigger } from '@swisspost/design-system-components/components/post-collapsible-trigger.js';
import { defineCustomElement as definePostIcon } from '@swisspost/design-system-components/components/post-icon.js';
import { defineCustomElement as definePostLogo } from '@swisspost/design-system-components/components/post-logo.js';
import { defineCustomElement as definePostMenu } from '@swisspost/design-system-components/components/post-menu.js';
import { defineCustomElement as definePostMenuItem } from '@swisspost/design-system-components/components/post-menu-item.js';
import { defineCustomElement as definePostMenuTrigger } from '@swisspost/design-system-components/components/post-menu-trigger.js';
import './components/post-docs-shell/post-docs-shell';
import './styles/main.scss';

definePostCollapsible();
definePostCollapsibleTrigger();
definePostIcon();
definePostLogo();
definePostMenu();
definePostMenuItem();
definePostMenuTrigger();
