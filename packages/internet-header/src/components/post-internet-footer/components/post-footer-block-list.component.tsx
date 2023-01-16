import { h } from '@stencil/core';
import { CustomBlockEntity } from '../../../models/footer.model';

export const PostFooterBlockList = (props: { block: CustomBlockEntity }) => {
  return (
    <div class="block-list">
      <h3>{props.block.title}</h3>
      <ul class="no-list box link-list">
        {props.block.links &&
          props.block.links.map(link => (
            <li>
              <a class="flyout-link" href={link.url} target={link.target}>
                {link.text}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
};
