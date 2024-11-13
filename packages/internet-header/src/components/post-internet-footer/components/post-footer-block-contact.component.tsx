import { h } from '@stencil/core';
import { BlockEntity } from '../../../models/footer.model';

function stripHtml(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}
const callUnblu = () => {
  if (typeof window['unbluLSLoad'] === 'function') {
    window['unbluLSLoad']();
  } else {
    console.error(
      'swisspost-internet-footer: The function "unbluLSLoad" could not be called because it is not available in the global scope. Did you include the unblu live chat script on your page?',
    );
  }
};

const LiveSupport = (props: { hours: string }) => (
  <button
    class="hours btn btn-link"
    id="liveSupport"
    type="button"
    onClick={callUnblu}
    innerHTML={stripHtml(props.hours)}
  ></button>
);

export const PostFooterBlockContact = (props: {
  block: BlockEntity;
  liveSupportEnabled: boolean;
  key: string;
}) => {
  return (
    <div class="block-contact">
      <h3>{props.block.title}</h3>
      {props.block.content &&
        props.block.content.map((content, index) => {
          const isLiveSupport =
            index === props.block.content!.length - 1 && content.text === 'Live Support';
          if (isLiveSupport && !props.liveSupportEnabled) {
            return null;
          }
          return (
            <div class="content-row" key={content.name}>
              {content.number !== undefined ? <p class="number">{content.number}</p> : null}
              {content.text !== undefined ? <p class="text">{content.text}</p> : null}
              {content.hours && isLiveSupport && <LiveSupport hours={content.hours} />}
              {content.hours && !isLiveSupport && (
                // Some values arrive in the form of <p>8&mdash;12</p> and without replace and innerHTML, tags get rendered as text (project="klp" language="en" environment="int02")
                <p class="hours" innerHTML={stripHtml(content.hours)}></p>
              )}
              {content.describe !== undefined ? <p class="describe">{content.describe}</p> : null}
            </div>
          );
        })}
    </div>
  );
};
