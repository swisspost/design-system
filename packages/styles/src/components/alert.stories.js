import { processAttributes, processContent } from '../../.storybook/utils/template';
import docs from './alert.stories-docs.mdx';

import './alert.scss';

export default {
  title: 'Components/Alert',
  parameters: {
    docs: {
      page: docs
    }
  },
  args: {
    variant: 'primary',
    hideIcon: false,
    showToggleButton: false,
    dismissible: false,
    visible: true,
    fixed: false,
    content: 'This is an alert!'
  },
  argTypes: {
    variant: {
      name: 'Variant',
      description: 'Defines the components background-, border- and text-color.',
      control: {
        type: 'select'
      },
      options: [
        'primary',
        'notification',
        'success',
        'danger',
        'error',
        'warning',
        'info'
      ]
    },
    hideIcon: {
      name: 'Hide Icon',
      description: 'Defines if the component is rendered with icon or not.',
      control: {
        type: 'boolean'
      }
    },
    showToggleButton: {
      name: 'Toggle Button',
      description: 'Defines if the toggle button is visible or not.',
      control: {
        type: 'boolean'
      }
    },
    dismissible: {
      name: 'Dismissible',
      description: 'Defines if the component is dismissible or not.',
      control: {
        type: 'boolean'
      }
    },
    visible: {
      name: 'Visible',
      discription: 'Defined if a dismissible or toggleble component is initialy visible or not.',
      control: {
        type: 'boolean'
      }
    },
    fixed: {
      name: 'Fixed',
      description: 'Defines if the component is fixed to the bottom of the page or not.',
      control: {
        type: 'boolean'
      }
    },
    content: {
      name: 'Content',
      description: 'Defines the content inside of the component.',
      control: {
        type: 'text'
      }
    }
  }
}

function initializeToggling (id, initState) {
  const storageName = `alert-${id}-visible-state`;
  let alert;
  let togglers;
  
  function init () {
    const showsDocs = document.querySelector('#docs-root')?.hasAttribute('hidden') === false;
    const rootId = showsDocs ? 'docs-root' : 'root';

    setTimeout(() => {
      alert = document.querySelector(`#${rootId} #${id}`);
      togglers = document.querySelectorAll(`#${rootId} [aria-controls="${id}"]`);
      
      if (alert && togglers) {
        Array.from(togglers)
          .forEach(toggler => {
            toggler.addEventListener('click', toggle);
          });
        
        if (sessionStorage.getItem(storageName) === null) sessionStorage.setItem(storageName, initState);
        updateState();
      }
    }, 100);
  }

  function updateState (state) {
    const visible = state ?? sessionStorage.getItem(storageName) === 'true';
    
    alert.classList[visible ? 'remove' : 'add']('d-none');
    sessionStorage.setItem(storageName, visible);
  }

  function toggle () {
    updateState(sessionStorage.getItem(storageName) !== 'true');
  }

  function reset () {
    Array.from(togglers)
      .forEach(toggler => {
        toggler.removeEventListener('click', toggle);
      });

    sessionStorage.removeItem(storageName);
  }
  
  new MutationObserver(() => {
    reset();
    init();
  })
  .observe(document.querySelector('#docs-root'), {
    attributeFilter: ['hidden'],
    subtree: false
  });
  
  init();
  window.onbeforeunload = reset;
}

const Template = (args, story) => `
${args.showToggleButton ? `<button class="btn btn-secondary mb-3" aria-controls="${story.id}">toggle alert</button>` : ''}
<div
  id="${processAttributes({ [story.id]: args.dismissible || args.showToggleButton })}"
  class="${processAttributes(['alert', `alert-${args.variant}`, { 'no-icon': args.hideIcon, 'alert-dismissible': args.dismissible, 'alert-fixed-bottom': args.fixed }])}"
  role="alert"
>
  ${args.dismissible ? `<button class="btn-close" aria-label="close" aria-controls="${story.id}"></button>` : ''}
  ${processContent(args.content, args)}
</div>
${args.dismissible || args.showToggleButton ? `<script>(${initializeToggling})('${story.id}', ${args.visible})</script>` : ''}`;

export const Default = Template.bind({});

/*
 * Contextual variants
*/
export const ContextualVariants = Template.bind({});

ContextualVariants.parameters = {
  controls: {
    include: ['Variant']
  }
};

ContextualVariants.args = {
  content: `This is an {{ args.variant }} alert!`
};

/*
 * Additional content
*/
export const AdditionalContent = Template.bind({});

AdditionalContent.parameters = {
  controls: {
    include: ['Variant', 'Content']
  }
};

AdditionalContent.args = {
  variant: 'success',
  content: `<h4>Example with more content</h4>
<p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
<hr>
<p>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>`
};

/*
 * Hide icon
*/
export const WithoutIcon = Template.bind({});

WithoutIcon.parameters = {
  controls: {
    include: ['Variant', 'Hide Icon']
  }
};

WithoutIcon.args = {
  hideIcon: true,
  content: 'This is an alert {{ args.hideIcon ? \'without\' : \'with\' }} icon!'
};

/*
 * Dismissible
*/

export const Dismissible = Template.bind({});

Dismissible.parameters = {
  controls: {
    include: ['Variant', 'Dismissible']
  }
};

Dismissible.args = {
  dismissible: true,
  content: 'This is an {{ args.dismissible ? \'dismissible\' : \'non-dismissible\' }} alert!'
};

/*
 * Alert fixed
*/
export const Fixed = Template.bind({});

Fixed.parameters = {
  controls: {
    include: ['Variant', 'Fixed']
  }
};

Fixed.args = {
  variant: 'warning',
  showToggleButton: true,
  dismissible: true,
  fixed: true,
  visible: false,
  content: 'This is {{ args.fixed ? \'a fixed\' : \'an inline\' }} alert!'
};
