import { FunctionalComponent, h } from '@stencil/core';
import { MegadropdownConfig } from '@/models/header.model';
import { createIdFrom } from '@/utils/create-id-from';
import { getText } from '@/utils/get-text';
import { Title } from './Title';
import { Link } from './Link';

interface MegaDropdownProps {
  textClose: string;
  textBack: string;
}

export const MegaDropdown: FunctionalComponent<
  { config: MegadropdownConfig } & MegaDropdownProps
> = ({ config, textClose, textBack }) => {
  const megaDropdownId = createIdFrom(config.trigger.text);

  return [
    <post-megadropdown-trigger for={megaDropdownId}>
      {config.trigger.text}
    </post-megadropdown-trigger>,

    <post-megadropdown id={megaDropdownId} textClose={textClose} textBack={textBack}>
      {config.overview && <Link config={config.overview} class="post-megadropdown-overview" />}
      <div class="row row-cols-1 row-cols-sm-2">
        {config.sections.map(section => (
          <MegaDropdownSection config={section} />
        ))}
      </div>
    </post-megadropdown>,
  ];
};

const MegaDropdownSection: FunctionalComponent<{
  config: MegadropdownConfig['sections'][number];
}> = ({ config }) => {
  const titleText = getText(config.title);
  const titleId = createIdFrom(titleText);

  return (
    <div class="col">
      <Title class="post-megadropdown-list-title" id={titleId} config={config.title} />
      <ul class="post-megadropdown-list" aria-labelledby={titleId}>
        {config.items.map(item => (
          <li>
            <Link config={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
