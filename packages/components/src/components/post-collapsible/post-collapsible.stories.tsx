export default {
  title: 'Components/post-collapsible',
  component: 'post-collapsible',
  argTypes: {
    nested: {
      name: 'nested collapsible',
      table: { category: 'Contents' },
      type: { name: 'boolean', required: false },
      description: 'If `true`, displays a post-collapsible element nested inside the main one.',
      control: {
        type: 'boolean'
      }
    }
  }
};

const defaultArgs = {
  collapsed: false,
  nested: false
};

const DefaultTemplate = ({ collapsed, nested }) => `<post-collapsible${collapsed ? ' collapsed="true"' : ''}>
    <h2 slot="header">Collapsible header</h2>${nested ? `
    <div slot="body">
      <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
      <post-collapsible>
        <h3 slot="header">Nested collapsible header</h3>
        <div slot="body">Nested collapsible body.</div>
      </post-collapsible>
    </div>` : `
    <p slot="body">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>`}
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
