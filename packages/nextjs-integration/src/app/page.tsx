import {
  PostAccordion,
  PostAccordionItem,
  PostIcon,
  PostPopover,
  PostTabHeader,
  PostTabPanel,
  PostTabs,
  PostTooltip,
} from '@swisspost/design-system-components-react';
import Image from 'next/image';
import SimpleClientComponent from './component';

export default function Home() {
  return (
    <>
      <SimpleClientComponent />
      <h1 className="visually-hidden">This is the homepage</h1>
    </>
  );
}
