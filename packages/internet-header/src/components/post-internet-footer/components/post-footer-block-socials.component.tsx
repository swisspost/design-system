import { h } from '@stencil/core';
import { ContentEntity } from '../../../models/footer.model';

export const PostFooterBlockSocials = (props: { content: ContentEntity; key: string }) => {
  return (
    <div class="block-socials">
      <h3>{props.content.title}</h3>
      <ul class="no-list socials">
        {props.content.links.map(link => (
          <li key={link.url}>
            <a href={link.url} target={link.target}>
              <span class="visually-hidden">{link.name}</span>
              <svg aria-hidden="true">
                <use href={`#${link.icon}`} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
