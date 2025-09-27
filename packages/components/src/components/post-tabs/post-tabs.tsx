import { Component, Element, Event, EventEmitter, h, Host, Method, Prop } from '@stencil/core';
import { fadeIn, fadeOut } from './animations';

@Component({
  tag: 'post-tabs',
  styleUrl: 'post-tabs.scss',
  shadow: true,
})
export class PostTabs {
  @Element() host: HTMLPostTabsElement;
  
  private activeTab: HTMLPostTabHeaderElement;
  private showing: Animation;
  private hiding: Animation;
  private isLoaded = false;

  @Prop() activePanel?: string;
  @Prop({ reflect: true }) fullWidth: boolean = false;

  @Event() postChange: EventEmitter<string>;

  private get tabs(): HTMLPostTabHeaderElement[] {
    return Array.from(this.host.querySelectorAll('post-tab-header'));
  }

  componentDidLoad() {
    this.setupTabs();
    const firstPanel = this.activePanel || this.tabs[0]?.panel;
    void this.show(firstPanel);
    this.isLoaded = true;
  }

  @Method()
  async show(panelName: string) {
    if (panelName === this.activeTab?.panel) return;

    const previousTab = this.activeTab;
    const newTab = this.tabs.find(t => t.panel === panelName);
    
    if (!newTab) return;

    this.activateTab(newTab);

    // Handle ongoing animations
    if (this.showing) {
      this.showing.effect['target'].style.display = 'none';
      this.showing.finish();
    }

    // Hide previous panel
    if (previousTab && !this.showing && !this.hiding) {
      this.hidePanel(previousTab.panel);
    }

    // Wait for hide to complete
    if (this.hiding) await this.hiding.finished;

    // Show new panel
    this.showSelectedPanel();

    // Wait for show to complete
    if (this.showing) await this.showing.finished;

    // Emit change event
    if (this.isLoaded) {
      this.postChange.emit(this.activeTab.panel);
    }
  }

  private setupTabs() {
    this.tabs.forEach(tab => {
      if (!tab.getAttribute('slot')) {
        tab.setAttribute('slot', 'tabs');
      }

      const panel = this.host.querySelector(`post-tab-panel[name="${tab.panel}"]`);
      if (panel) {
        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', tab.id);
      }

      tab.addEventListener('click', () => void this.show(tab.panel));
      
      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          void this.show(tab.panel);
        }
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          this.navigateTabs(tab, e.key);
        }
      });
    });
  }

  private activateTab(tab: HTMLPostTabHeaderElement) {
    if (this.activeTab) {
      this.activeTab.setAttribute('aria-selected', 'false');
      this.activeTab.setAttribute('tabindex', '-1');
      this.activeTab.classList.remove('active');
    }

    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.classList.add('active');
    this.activeTab = tab;
  }

  private hidePanel(panelName: string) {
    const panel = this.host.querySelector(`post-tab-panel[name="${panelName}"]`) as HTMLElement;
    if (!panel) return;

    this.hiding = fadeOut(panel);
    this.hiding.onfinish = () => {
      panel.style.display = 'none';
      this.hiding = null;
    };
  }

  private showSelectedPanel() {
    const panel = this.host.querySelector(`post-tab-panel[name="${this.activeTab.panel}"]`) as HTMLElement;
    panel.style.display = 'block';

    if (!this.isLoaded) return;

    this.showing = fadeIn(panel);
    this.showing.onfinish = () => {
      this.showing = null;
    };
  }

  private navigateTabs(currentTab: HTMLPostTabHeaderElement, key: string) {
    const currentIndex = this.tabs.indexOf(currentTab);
    let nextIndex: number;

    if (key === 'ArrowRight') {
      nextIndex = currentIndex + 1 >= this.tabs.length ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex - 1 < 0 ? this.tabs.length - 1 : currentIndex - 1;
    }

    this.tabs[nextIndex]?.focus();
  }

  render() {
    return (
      <Host>
        <div class="tabs-wrapper">
          <div class="tabs" role="tablist">
            <slot name="tabs" onSlotchange={() => this.setupTabs()} />
          </div>
        </div>
        <div class="tab-content">
          <slot />
        </div>
      </Host>
    );
  }
}