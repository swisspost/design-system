import { Component, Element, h, Host, Prop } from '@stencil/core';

Component({
  tag: 'post-tabs',
  styleUrl: 'post-tabs.scsss',
  shadow: true,
})

export class PostTabs {
  @Element() host: HTMLPostTabsElement;
  @Prop() activePanel: string;
  private activeTab: HTMLPostTabHeaderElement;
  
  get tabs(): HTMLPostTabHeaderElement[] {
    return Array.from(this.host.querySelectorAll('post-tab-header'));
  }

  componentDidLoad() {
    this.setupTabs();
    const firstPanel = this.activePanel || this.tabs[0].panel;
    this.showPanel(firstPanel)
  }

  private setupTabs() {
    this.tabs.forEach(tab => {
      if (!tab.getAttribute('slot')) {
        tab.setAttribute('slot', 'tabs')
      }

      const panel = this.host.querySelector(`post-tab-panel[name="${tab.panel}"]`)
      if (panel) {
        tab.setAttribute('aria-controls', panel.id)
        panel.setAttribute('aria-labeledby', tab.id)
      }

      tab.addEventListener('click', () => {
        this.showPanel(tab.panel)
      })

      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === '') {
          e.preventDefault();
          this.showPanel(tab.panel)
        } 
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          this.navigateTabs(tab, e.key)
        }
      })
    })
  }

  private navigateTabs(currentTab: HTMLPostTabHeaderElement, key: string) {
    const currentIndex = this.tabs.indexOf(currentTab);
    let newIndex: number;

    if (key === "ArrowRight") {
      newIndex = currentIndex + 1 >= this.tabs.length ? 0 : currentIndex + 1
    } else {
      newIndex = currentIndex - 1 < 0 ? this.tabs.length - 1 : currentIndex -1;
    }

    this.tabs[newIndex].focus()
  }

  showPanel(panelName: string) {
    if (this.activeTab.panel === panelName) return;
    
    if (this.activeTab) {
      this.activeTab.setAttribute('aria-selected', 'false');
      this.activeTab.setAttribute('tab-index', '-1');
      this.activeTab.classList.remove('active')
    }

    const newTab = this.tabs.find(tab => tab.panel === panelName)

    if (newTab) {
      newTab.setAttribute('aria-selected', 'true');
      newTab.setAttribute('tab-index', '0');
      newTab.classList.add('active');
      this.activeTab = newTab
    }

    this.host.querySelectorAll('post-tab-panel').forEach(panel => {
      panel.style.display = panel.name === panelName ? 'block' : 'none';
    });
  }

  render() {
    return (
      <Host>
        <div role='tablist'>
          <slot name='tabs' onSlotchange={() => this.setupTabs()}/>
        </div>
        <div>
          <slot />
        </div>
      </Host>
    )
  }
}