export default {
  title: 'Components/post-collapsible',
  component: 'post-collapsible',
  argTypes: {
    nested: {
      name: 'nested collapsible',
      type: { name: 'boolean', required: false },
      description: 'If `true`, displays a post-collapsible element nested inside the main one.',
      table: { category: 'Contents' },
      control: { type: 'boolean' }
    }
  }
};

const defaultArgs = {
  nested: false
};

const DefaultTemplate = ({ headingLevel, collapsed, nested }) =>
  `<post-collapsible${isNaN(headingLevel) ? '' : ' heading-level="' + headingLevel + '"'}${collapsed ? ' collapsed="true"' : ''}>
    <span slot="header">Collapsible header</span>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>${nested ? `
    <post-collapsible heading-level="${isNaN(headingLevel) ? 3 : headingLevel + 1}">
      <span slot="header">Nested collapsible header</span>
      <p>Nested collapsible body.</p>
    </post-collapsible>` : ''}
  </post-collapsible>`;

export const Default = DefaultTemplate.bind({});
Default.args = { ...defaultArgs };

const NoHeaderTemplate = ({ collapsed, nested }) =>
  `<script>
    function triggerCollapse(collapsibleControl, open) {
        const collapsibleId = collapsibleControl.getAttribute('aria-controls');
        const collapsible = document.querySelector('#' + collapsibleId);
        collapsible.toggle(open).then(() => {
            const controls = document.querySelectorAll('[aria-controls=' + collapsibleId + ']');
            controls.forEach(control => control.setAttribute('aria-expanded', String(!collapsible.collapsed)));
        });
    }
  </script>

  <button aria-controls="collapsibleExample" aria-expanded="${!collapsed}" onclick="triggerCollapse(this)">Toggle</button>
  <button aria-controls="collapsibleExample" aria-expanded="${!collapsed}" onclick="triggerCollapse(this, true)">Show</button>
  <button aria-controls="collapsibleExample" aria-expanded="${!collapsed}" onclick="triggerCollapse(this, false)">Hide</button>${nested ? `

  <button aria-controls="nestedCollapsibleExample" aria-expanded="${!collapsed}" onclick="triggerCollapse(this)">Toggle nested</button>
  <button aria-controls="nestedCollapsibleExample" aria-expanded="${!collapsed}" onclick="triggerCollapse(this, true)">Show nested</button>
  <button aria-controls="nestedCollapsibleExample" aria-expanded="${!collapsed}" onclick="triggerCollapse(this, false)">Hide nested</button>` : ''}

  <hr/>
  ${nested ? `
  <post-collapsible id="collapsibleExample"${collapsed ? ' collapsed="true"' : ''}>
    <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
    <post-collapsible id="nestedCollapsibleExample">Nested collapsible content</post-collapsible>
  </post-collapsible>` : `
  <post-collapsible id="collapsibleExample"${collapsed ? ' collapsed="true"' : ''}>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</post-collapsible>`}
  `;

export const NoHeader = NoHeaderTemplate.bind({});
NoHeader.args = { ...defaultArgs };
NoHeader.parameters = {
  controls: {
    exclude: ['heading-level']
  }
}
