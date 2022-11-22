export default {
  title: 'Components/Blockquotes',
  argTypes: {
    quoteText: {
      control: {
        type: 'text',
      },
    },
    caption: {
      control: {
        type: 'boolean',
      },
    },
    captionText: {
      control: {
        type: 'text',
      },
      if: { arg: 'caption' },
    },
    sourceTitle: {
      control: {
        type: 'text',
      },
      if: { arg: 'caption' },
    },
    nestedText: {
      control: {
        type: 'text',
      },
    },
    language: {
      control: {
        type: 'radio',
      },
      options: ['de', 'en'],
    },
  }
}

// DefaultTemplate

const DefaultTemplate = (args) => {
  const blockquote = `
        <blockquote class="blockquote" lang="${args.language}">
            <p>${args.quoteText}</p>
        </blockquote>`;

  if (args.caption) {
    return `
        <figure>
            ${blockquote}
            <figcaption class="blockquote-footer">
                ${args.captionText} <cite title="Source Title">${args.sourceTitle}</cite>
            </figcaption>
        </figure>`;
  }

  return blockquote;
}

export const DefaultBlockquote = DefaultTemplate.bind({});
DefaultBlockquote.parameters = {
  controls: {
    include: ['quoteText', 'caption', 'captionText', 'sourceTitle', 'language']
  }
}
DefaultBlockquote.args = {
  quoteText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.',
  caption: false,
  captionText: 'Someone famous in',
  sourceTitle: 'Source Title',
  language: 'de',
}

// NestedTemplate

const NestedTemplate = (args) => {
  const blockquoteText = args.quoteText.replace(/{nestedText}/g, `<q>${args.nestedText}</q>`);

  const nestedBlockquote = `
        <blockquote class="blockquote" lang="${args.language}">
            <q>${blockquoteText}</q>
        </blockquote>`;

  if (args.caption) {
    return `
        <figure>
            ${nestedBlockquote}
            <figcaption class="blockquote-footer">
                ${args.captionText} <cite title="Source Title">${args.sourceTitle}</cite>
            </figcaption>
        </figure>`;
  }

  return nestedBlockquote;
}

export const NestedBlockquote = NestedTemplate.bind({});
NestedBlockquote.parameters = {
  controls: {
    include: ['quoteText', 'caption', 'captionText', 'sourceTitle', 'nestedText', 'language']
  }
}
NestedBlockquote.args = {
  quoteText: 'Nested quotes, consectetur adipiscing elit. Integer {nestedText} posuere erat a ante.',
  caption: false,
  captionText: 'Someone famous in',
  sourceTitle: 'Source Title',
  nestedText: 'I\'m nested!',
  language: 'de',
}