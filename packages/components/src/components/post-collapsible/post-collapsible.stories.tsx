export default {
  title: 'Components/post-collapsible',
  component: 'post-collapsible',
};

const defaultArgs = {
  collapsed: false,
};

const DefaultTemplate = ({ collapsed }) =>
  `<post-collapsible${collapsed ? ' collapsed="true"' : ''}>
    <div slot="header">Collapsible header</div>
    <div slot="body">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</div>
  </post-collapsible>`;

export const Default = DefaultTemplate.bind({});
Default.args = { ...defaultArgs };

const NoHeaderTemplate = ({ collapsed }) =>
  `<script>
    function triggerCollapse(open) {
        const collapsible = document.querySelector('post-collapsible');
        collapsible.toggle(open).then(() => {
            const controls = document.querySelectorAll('[aria-controls="collapsibleExample"]');
            controls.forEach(control => control.setAttribute('aria-expanded', String(!collapsible.collapsed)));
        });
    }
  </script>

  <button aria-controls="collapsibleExample" aria-expanded="${!collapsed}" onclick="triggerCollapse()">Toggle</button>
  <button aria-controls="collapsibleExample" aria-expanded="${!collapsed}" onclick="triggerCollapse(true)">Show</button>
  <button aria-controls="collapsibleExample" aria-expanded="${!collapsed}" onclick="triggerCollapse(false)">Hide</button>

  <hr/>

  <post-collapsible id="collapsibleExample"${collapsed ? ' collapsed="true"' : ''}>
    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
  </post-collapsible>`;

export const NoHeader = NoHeaderTemplate.bind({});
NoHeader.args = { ...defaultArgs };
