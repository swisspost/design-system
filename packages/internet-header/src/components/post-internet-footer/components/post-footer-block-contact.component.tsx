import { h } from '@stencil/core';
import { BlockEntity } from '../../../models/footer.model';
const getContentHours = (hours: string) => hours.replace(/<[^>]*>?/gm, '');

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
    innerHTML={getContentHours(props.hours)}
  ></button>
);

export const PostFooterBlockContact = (props: {
  block: BlockEntity;
  liveSupportEnabled: boolean;
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
            <div class="content-row">
              {content.number ? <p class="number">{content.number}</p> : null}
              {content.text ? <p class="text">{content.text}</p> : null}
              {content.hours && isLiveSupport && <LiveSupport hours={content.hours} />}
              {content.hours && !isLiveSupport && (
                // Some values arrive in the form of <p>8&emdash;12</p> and without replace and innerHTML, tags get rendered as text (project="klp" language="en" environment="int02")
                <p class="hours" innerHTML={getContentHours(content.hours)}></p>
              )}
              {content.describe ? <p class="describe">{content.describe}</p> : null}
            </div>
          );
        })}
    </div>
  );
};
