import React from 'react';

import '@swisspost/design-system-styles/basics.scss';
import '@swisspost/design-system-styles/components/card.scss';
import '@swisspost/design-system-styles/components/button.scss';

export default {
  title: 'Components/Card',
  parameters: {
    controls: {
      exclude: ['showHeader', 'showFooter']
    }
  },
  args: {
    title: 'Loremipsum',
    content: 'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    showImage: true,
    showHeader: false,
    header: 'Takimata sanctus',
    showFooter: false,
    footer: '2 rebum clita',
    showButton: true,
    button: 'Sed diam voluptua'
  },
  argTypes: {
    title: {
      control: {
        type: 'text'
      }
    },
    content: {
      control: {
        type: 'text'
      }
    },
    showImage: {
      control: {
        type: 'boolean'
      }
    },
    showHeader: {
      control: {
        type: 'boolean'
      }
    },
    header: {
      control: {
        type: 'text'
      },
      if: { arg: 'showHeader' }
    },
    showFooter: {
      control: {
        type: 'boolean'
      }
    },
    footer: {
      control: {
        type: 'text'
      },
      if: { arg: 'showFooter' }
    },
    showButton: {
      control: {
        type: 'boolean'
      }
    },
    button: {
      control: {
        type: 'text'
      },
      if: { arg: 'showButton' }
    }
  },
  decorators: [
    Story => <div className="row">
      <div className="col-lg-4 col-rg-6 col-12">
        <Story/>
      </div>
    </div>
  ]
};

const Template = args => {
  const image = <img className="card-img-top" src="https://www.baumpflegeportal.de/wp-content/uploads/2016/05/160509_Starke-Baumtypen_Eiche-im-Seidengewand_02.jpg" alt="Card image cap"/>;
  const header = <div className="card-header">{ args.header }</div>;
  const button = <a href="#" className="btn btn-primary btn-animated"><span>{ args.button }</span></a>;
  const footer = <div className="card-footer text-muted">{ args.footer }</div>;

  return <div className="card">
    { args.showImage ? image : null }
    { args.showHeader ? header : null }
    <div className="card-body">
      <h5 className="card-title">{ args.title }</h5>
      <p className="card-text">{ args.content }</p>
      { args.showButton ? button : null }
    </div>
    { args.showFooter ? footer : null }
  </div>;
};

export const Card = Template.bind({});

export const HeaderFooter = Template.bind({});

HeaderFooter.parameters = {
  controls: {
    exclude: ['showImage']
  }
}

HeaderFooter.args = {
  showImage: false,
  showHeader: true,
  showFooter: true
};
