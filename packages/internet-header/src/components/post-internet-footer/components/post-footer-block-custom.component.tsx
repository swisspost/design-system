import { h } from '@stencil/core';
import { CustomBlockEntity } from '../../../models/footer.model';

export const PostFooterBlockCustom = (props: { block: CustomBlockEntity }) => {
  return (
    <div class="pre-footer">
      <div class="block-custom container">
        <h3>{props.block.title}</h3>
        <ul class="no-list box link-list">
          {props.block.links &&
            props.block.links.map(link => (
              <li key={link.url}>
                <a class="flyout-link" href={link.url} target={link.target}>
                  {link.text}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
