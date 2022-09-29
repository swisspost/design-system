import './topic-teaser.scss';

export default {
  title: 'Components/Topic teaser',
  argTypes: {
    titleText: {
      control: {
        type: 'text',
      },
    },
    subtitleText: {
      control: {
        type: 'text',
      },
    },
    linkNumber: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
      },
    },
    imagePosition: {
      control: {
        type: 'radio',
      },
      options: ['left', 'right'],
    },
    backgroundColor: {
      control: {
        type: 'select',
      },
      options: [
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
        'bg-aubergine-bright',
      ],
    },
  },
};

const TopicTeaserTemplate = (args) => {
  const POSITION_CLASS_MAP = {
    left: 'topic-teaser-reverse ',
    right: '',
  };

  const position = POSITION_CLASS_MAP[args.imagePosition];

  const image = `
    <div class="topic-teaser-image-container">
      <img
        class="topic-teaser-image"
        src="https://picsum.photos/id/553/800/800"
        width="100%"
        height="100%"
        alt="Test teaser image"
      />
    </div>
    `;

  const getLinkTemplate = (linkText) => {
    return `
      <li class="link-list-item">
        <a href="#">
          <span>${linkText}</span>
        </a>
      </li>
    `;
  };

  const text = [
    'Bacon ipsum dolor amet sausage',
    'short ribs t-bone spare ribs',
    'ham bresaola biltong',
    'pork belly cupim jowl pancetta',
    ' chicken leberkas cow tail',
    'filet mignon swine flank pork loin',
    'meatball, pig corned beef burg',
    'landjaeger pork loin flank',
  ];

  const getLinkList = (numberOfItems) => {
    let linkList = '';

    for (let i = 0; i < numberOfItems; i++) {
      linkList += getLinkTemplate(text[Math.floor(Math.random() * text.length)]);
    }

    return linkList;
  };

  const content = `
    <div class="topic-teaser-content">
      <h2 class="topic-teaser-title font-curve-large mb-large">
        <span class="bold">${args.titleText}</span>
        <span class="light">${args.subtitleText}</span>
      </h2>
      <ul class="link-list mb-large">
        ${getLinkList(args.linkNumber)}
      </ul>
    </div>
    `;

  return `
  <div class="topic-teaser ${args.backgroundColor} ${position}mb-huge-r">
    <div class="container">
      <div class="topic-teaser-container ${args.backgroundColor}">
        <div class="row pt-huge-r">
          ${args.imagePosition === 'left' ? image + content : content + image}
        </div>
      </div>
    </div>
  </div>
  `;
};

export const TopicTeaser = TopicTeaserTemplate.bind({});
TopicTeaser.parameters = {
  controls: {
    include: ['titleText', 'subtitleText', 'linkNumber', 'imagePosition', 'backgroundColor'],
  },
};

TopicTeaser.args = {
  titleText: 'Lorem ipsum',
  subtitleText: 'sit amet, consetetur sadipscing elitr',
  linkNumber: 5,
  imagePosition: 'left',
  backgroundColor: 'bg-nightblue',
};
