import React from 'react';

import '@swisspost/design-system-styles/basics.scss';

export default {
  title: 'Components/Blockquotes',
  parameters: {
    controls: {
      exclude: ['nestedText']
    }
  },
  args: {
    quoteText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
    caption: false,
    captionText: 'Someone famous in',
    sourceTitle: 'Source Title',
    nestedText: 'I\'m nested!',
    language: 'de'
  },
  argTypes: {
    quoteText: {
      control: {
        type: 'text'
      }
    },
    caption: {
      control: {
        type: 'boolean'
      }
    },
    captionText: {
      control: {
        type: 'text'
      },
      if: { arg: 'caption' }
    },
    sourceTitle: {
      control: {
        type: 'text'
      },
      if: { arg: 'caption' }
    },
    nestedText: {
      control: {
        type: 'text'
      }
    },
    language: {
      control: {
        type: 'radio'
      },
      options: ['de', 'en']
    }
  }
};

const Template = args => {
  const quote = args.quoteText
    .split('{nestedtext}')
    .reduce((quote, part, index, parts) => quote.concat(part, parts.length > 0 && index + 1 < parts.length ? <q>{ args.nestedText }</q> : []), []);

  const blockquote = <blockquote className="blockquote" lang={ args.language }>
    <q>{ quote }</q>
  </blockquote>;

  if (args.caption) {
    return <figure>
      { blockquote }
      <figcaption className="blockquote-footer">
        { args.captionText } <cite title={ args.sroucetitle }>{ args.sourceTitle }</cite>
      </figcaption>
    </figure>;
  }

  return blockquote;
};

/**
 * default blockquote
*/

export const Default = Template.bind({});

/**
 * nested blockquote
 */

 export const Nested = Template.bind({});

 Nested.parameters = {
  controls: {
    exclude: []
  }
};

 Nested.args = {
  quoteText: 'Consectetur {nestedtext} adipiscing elit. Integer {nestedtext} posuere erat a ante.'
 };
