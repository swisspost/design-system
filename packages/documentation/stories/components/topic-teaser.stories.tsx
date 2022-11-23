import React from 'react';

import '@swisspost/design-system-styles/basics.scss';
import '@swisspost/design-system-styles/components/topic-teaser.scss';

export default {
  title: 'Components/Topic Teaser',
  args: {
    title: 'Title ipsum',
    subtitle: 'Subtitle vero eos et accusam et justo',
    linkCount: 5,
    alignment: '',
    backgroundColor: 'bg-nightblue'
  },
  argTypes: {
    title: {
      control: {
        type: 'text'
      }
    },
    subtitle: {
      control: {
        type: 'text'
      }
    },
    linkCount: {
      control: {
        type: 'number',
        min: 1,
        max: 10
      }
    },
    alignment: {
      control: {
        type: 'radio',
        labels: {
          'topic-teaser-reverse': 'Image left',
          '': 'Image right'
        }
      },
      options: ['topic-teaser-reverse', '']
    },
    backgroundColor: {
      control: {
        type: 'select'
      },
      options: [
        'bg-light',
        'bg-dark',
        'bg-nightblue',
        'bg-nightblue-bright',
        'bg-petrol',
        'bg-petrol-bright',
        'bg-coral',
        'bg-coral-bright',
        'bg-olive',
        'bg-olive-bright',
        'bg-purple',
        'bg-purple-bright',
        'bg-aubergine',
        'bg-aubergine-bright'
      ]
    }
  }
};

const linkTexts = [
  'At vero eos et accusam et',
  'Dolores et ea rebum',
  'Stet clita kasd gubergren',
  'Sed diam nonumy eirmod',
  'Duo dolores et ea rebum',
  'Magna aliquyam erat',
  'Consetetur sadipscing elitr',
  'Justo duo dolores',
  'Takimata sanctus est',
  'Nonummy nibh euismod'
];

const Template = args => {
  const links: string[] = [];

  for (let x = 0; x < args.linkCount; x++) {
    links.push(<li key={ x } className="link-list-item">
      <a href="#"><span>{ linkTexts[x] }</span></a>
    </li>);
  }

  const content: string[] = [
    <div key="image" className="topic-teaser-image-container">
      <img
        className="topic-teaser-image"
        src="https://picsum.photos/id/553/800/800"
        width="100%"
        height="100%"
        alt="Test teaser image"
      />
    </div>,
    <div key="content" className="topic-teaser-content">
      <h2 className="topic-teaser-title font-curve-large mb-large">
        <span className="bold">{ args.title }</span>
        <span className="light">{ args.subtitle }</span>
      </h2>
      <ul className="link-list mb-large">
        { links }
      </ul>
    </div>
  ];

  return <div className={ `topic-teaser ${args.backgroundColor} ${args.alignment} mb-huge-r` }>
    <div className="container">
      <div className={ `topic-teaser-container ${args.backgroundColor}` }>
        <div className="row pt-huge-r">
          { args.alignment === '' ? content.reverse() : content };
        </div>
      </div>
    </div>
  </div>;
};

export const Default = Template.bind({});
