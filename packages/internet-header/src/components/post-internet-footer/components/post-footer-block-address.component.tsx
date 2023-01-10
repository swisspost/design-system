import { h } from '@stencil/core';
import { BlockEntity } from '../../../models/footer.model';
import { PostFooterBlockSocials } from './post-footer-block-socials.component';

export const PostFooterBlockAddress = (props: { block: BlockEntity }) => {
  return (
    <div class="block-address">
      <h3>{props.block.title}</h3>
      {props.block.content
        .filter(content => content.address)
        .map(content => (
          <address class="vcard">
            <span class="adr" innerHTML={content.address}></span>
          </address>
        ))}
      {props.block.content
        .filter(content => content.links && content.links.length)
        .map(content => (
          <PostFooterBlockSocials content={content} />
        ))}
    </div>
  );
};
