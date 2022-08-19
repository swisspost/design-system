import './card.scss';

export default {
  title: 'Components/Card',
  argTypes: {
    titleText: {
      control: 'text',
    },
    bodyText: {
      control: 'text',
    },
    header: {
      control: {
        type: 'boolean',
      }
    },
    headerText: {
      control: 'text',
    },
    footer: {
      control: {
        type: 'boolean',
      }
    },
    footerText: {
      control: 'text',
    },
    image: {
      control: {
        type: 'boolean',
      }
    },
    buttonText: {
      control: 'text',
    },
    buttonBelowText: {
      control: {
        type: 'boolean',
      }
    },
  }
}

const DefaultTemplate = (args) => {
  const image = args.image ? `<img class="card-img-top" src="https://www.baumpflegeportal.de/wp-content/uploads/2016/05/160509_Starke-Baumtypen_Eiche-im-Seidengewand_02.jpg" alt="Card image cap">` : '';
  const button = args.buttonBelowText ? `<a href="#" class="btn btn-primary btn-animated"><span>${args.buttonText}</span></a>` : '';
  return ` 
    <div class="card" style="width: 18rem;">
        ${image}
            <div class="card-body">
              <h5 class="card-title">${args.titleText}</h5>
              <p class="card-text">${args.bodyText}</p>
              ${button}
            </div>
    </div>
    `
}

// DefaultTemplate

export const Default = DefaultTemplate.bind({});
Default.parameters = {
  controls: {
    include: ['titleText', 'bodyText', 'image', 'buttonBelowText', 'buttonText']
  }
}

Default.args = {
  titleText: 'Card title',
  bodyText: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
  image: true,
  buttonBelowText: true,
  buttonText: 'Go somewhere',
}

// HeaderFooterTemplate

const HeaderFooterTemplate = (args) => {
  const header = args.header ? `<div class="card-header">${args.headerText}</div>` : '';
  const button = args.buttonBelowText ? `<a href="#" class="btn btn-primary btn-animated"><span>${args.buttonText}</span></a>` : '';
  const footer = args.footer ? `<div class="card-footer text-muted">${args.footerText}</div>` : '';
  console.log(footer);
  return `
    <div class="row">
        <div class="col-lg-4 col-rg-6 col-12">
            <div class="card">
                ${header}
                <div class="card-body">
                    <h5 class="card-title">${args.titleText}</h5>
                    <p class="card-text">${args.bodyText}</p>
                    ${button}
                </div>
                ${footer}
            </div>
        </div>
    </div>
    `
}

export const HeaderFooter = HeaderFooterTemplate.bind({});
HeaderFooter.parameters = {
  controls: {
    include: ['header', 'headerText', 'titleText', 'bodyText', 'buttonBelowText', 'buttonText', 'footer', 'footerText']
  }
}

HeaderFooter.args = {
  header: true,
  headerText: 'Featured',
  titleText: 'Special title treatment',
  bodyText: 'With supporting text below as a natural lead-in to additional content.',
  buttonBelowText: true,
  buttonText: 'Go somewhere',
  footer: true,
  footerText: '2 days ago',
}