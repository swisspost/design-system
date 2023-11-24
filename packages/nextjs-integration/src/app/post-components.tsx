'use client';

import { PostCollapsible } from '@swisspost/design-system-components-react';
import { PostAccordion } from '@swisspost/design-system-components-react';
import {
  PostPopover,
  PostIcon,
  PostTabHeader,
  PostTooltip,
  PostTabPanel,
  PostTabs,
} from '@swisspost/design-system-components-react';

import { defineCustomElements } from '@swisspost/internet-header/loader';

defineCustomElements();

export const Tooltip = (args: any) => <PostTooltip {...args} />;
export const Tabs = (args: any) => <PostTabs {...args} />;
export const TabHeader = (args: any) => <PostTabHeader {...args} />;
export const TabPanel = (args: any) => <PostTabPanel {...args} />;
export const Icon = (args: any) => <PostIcon {...args} />;
export const Popover = (args: any) => <PostPopover {...args} />;
export const Collapsible = (args: any) => <PostCollapsible {...args} />;
export const Accordion = (args: any) => <PostAccordion {...args} />;
