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
        type: 'range',
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
    left: 'topic-teaser-reverse',
    right: '',
  };

  const position = POSITION_CLASS_MAP[args.imagePosition];

  const image =
    <div class="topic-teaser-image-container">
      <img
        class="topic-teaser-image"
        src="https://picsum.photos/id/553/800/800"
        width="100%"
        height="100%"
        alt="Test teaser image"
      />
    </div>;

  const content =
    <div class="topic-teaser-content">
      <h2 class="topic-teaser-title font-curve-large mb-large">
        <span class="bold">${args.titleText}</span>
        <span class="light">${args.subtitleText}</span>
      </h2>
      <ul class="link-list mb-large">
        <li class="link-list-item">
          <a href="#">
            <span>Lorem ipsum dolor</span>
          </a>
        </li>
        <li class="link-list-item">
          <a href="#">
            <span>sit amet, consetetur</span>
          </a>
        </li>
        <li class="link-list-item">
          <a href="#">
            <span>sadipscing elitr, sed</span>
          </a>
        </li>
        <li class="link-list-item">
          <a href="#">
            <span>diam nonumy eirmod</span>
          </a>
        </li>
        <li class="link-list-item">
          <a href="#">
            <span>tempor invidunt ut labore et dolore magna aliquyam</span>
          </a>
        </li>
      </ul>
    </div>;

  return `
  <div class="topic-teaser ${args.backgroundColor} ${position} mb-huge-r">
    <div class="container">
      <div class="topic-teaser-container ${args.backgroundColor}">
        <div class="row pt-huge-r"></div>
        if (${args.imagePosition} === 'left') {
          ${image}
          ${content}
        } else {
          ${content}
          ${image}
        }
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
  linkNumber: 1,
  imagePosition: 'left',
  backgroundColor: 'bg-nightblue',
};
