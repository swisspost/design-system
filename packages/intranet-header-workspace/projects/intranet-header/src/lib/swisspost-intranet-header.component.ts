import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  LOCALE_ID,
  NgZone,
  OnInit,
  SecurityContext,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { userImage } from './user';

@Component({
  selector: 'sp-intranet-header',
  templateUrl: './swisspost-intranet-header.component.html',
  styleUrls: ['./swisspost-intranet-header.component.scss'],
})
export class SwissPostIntranetHeaderComponent implements OnInit, AfterViewInit {
  @Input() siteTitle: string = '';
  @Input() languages = 'de,fr,it,en';
  @Input() currentUserId: string = '';
  @Input() displayName: string = '';
  @Input() additionalInfo: string = '';
  @Input() hasNavbar = true;
  @Input() showIntranetSearch = false;
  @Input() optionDropdownContent!: TemplateRef<any>;
  @Input() optionHeaderContent!: TemplateRef<any>;
  @Input() logoUrl: string = '';
  @Input() searchUrl: string = '';
  @Input() hideCurrentUserId: boolean = false;
  @Input() condenseHeader: boolean = false;

  @ViewChild('domWrapper') dom!: ElementRef;
  @ViewChild('optionDropdown') optionDropdown!: NgbDropdown;
  @ViewChild('optionDropdown', { read: ElementRef })
  optionDropdownElement!: ElementRef<HTMLElement>;

  isMobile: boolean | null = null;
  appLangs!: string[];
  avatarUrl = userImage;
  openedMenu = false;
  openedLangChooser = false;
  openedMenuOverflow = false;

  localization: {
    moreLabel: { [key: string]: string };
    searchPlaceholder: { [key: string]: string };
    postLogo: { [key: string]: string };
  } = {
    moreLabel: {
      de: 'Mehr',
      fr: 'Plus',
      it: 'Più',
      en: 'More',
    },
    searchPlaceholder: {
      de: 'Intranet durchsuchen',
      fr: "Parcourir l'Intranet",
      it: 'Cercare in intranet',
      en: 'Browse the intranet',
    },
    postLogo: {
      de: 'Die Post - zur Startseite',
      fr: 'La Poste - Accéder à la page d’accueil',
      it: 'La Posta - Vai alla pagina iniziale',
      en: 'Swiss Post - to the homepage',
    },
  };

  private windowResize$ = new Subject();
  private moreElement!: HTMLElement | null;
  private navElement!: HTMLElement;
  private navItems!: Array<HTMLElement>;
  private logoElement!: HTMLElement;
  private titleElement!: HTMLElement;
  private optionHeaderContentElement!: HTMLElement;
  private intranetSearchElement!: HTMLElement;
  private profileMenuElement!: HTMLElement;
  private navChanges!: MutationObserver;

  constructor(
    @Inject(LOCALE_ID) public lang: string,
    private router: Router,
    private zone: NgZone,
    private domSanitizer: DomSanitizer,
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        if (this.openedMenuOverflow) {
          this.hideMenuOverflow();
        }
        this.openedMenu = false;
        this.openedLangChooser = false;
      }
    });

    // use rxjs instead of HostListener to enable usage of debounce operator (see https://stackoverflow.com/a/44055389)
    // => drastically improves performance of component!
    this.windowResize$.subscribe(() => {
      this.computeIsMobile();
      setTimeout(this.navigationResize.bind(this));
    });

    this.zone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(50), distinctUntilChanged())
        .subscribe((e: Event) => {
          this.zone.run(() => {
            this.windowResize$.next(e);
          });
        });
    });
  }

  private get overflowItems() {
    return this.navItems.filter((el: HTMLElement) => el.classList.contains('nav-overflow'));
  }

  ngOnInit() {
    this.appLangs = this.languages.split(',');
    this.setLang(this.lang);
    const tempArr = RegExp(/lang=([a-zA-Z]{2})/).exec(location.href);
    if (tempArr && tempArr.length > 1) {
      this.setLang(tempArr[1]);
    }
  }

  ngAfterViewInit(): void {
    this.computeIsMobile();

    // this check is needed, because it would add another element when a link from within "#overflow" is clicked
    if (this.dom.nativeElement.querySelector('#more') == null) {
      this.navigationResize();

      if (!MutationObserver) return;

      this.navChanges = new MutationObserver(m => this.navMutationCallback(m));
      this.navChanges.observe(this.navElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }

    this.optionDropdownClick();
    new MutationObserver(() => {
      this.optionDropdownClick();
    }).observe(this.optionDropdownElement.nativeElement, {
      subtree: true,
      childList: true,
    });
  }

  public navMutationCallback(mutationList: MutationRecord[]) {
    if (mutationList.some(mutation => mutation.type === 'childList')) {
      // Resize the navbar anytime an nav item is added or removed
      const navItems = Array.from(
        this.navElement.querySelectorAll<HTMLElement>('.nav-item:not(#more)'),
      );
      if (navItems.length !== this.navItems.length) {
        this.navItems = navItems;
        this.navigationResize();
      }
    } else {
      // Resize the navbar anytime the text of a nav item changes
      const textNodeType = 3;
      if (
        mutationList.some(
          mutation =>
            mutation.type === 'characterData' && mutation.target.nodeType === textNodeType,
        )
      ) {
        this.navigationResize();
      }
    }
  }

  public handleLanguageChange(lang: string) {
    if (lang !== this.lang) {
      const sanitizedLocationUrl = this.domSanitizer.sanitize(SecurityContext.URL, location.href);
      this.setLang(lang);

      if (!sanitizedLocationUrl) {
        return;
      }

      const url = new URL(sanitizedLocationUrl);
      url.searchParams.set('lang', lang);
      location.href = url.toString();
    }
  }

  public setLang(value: string) {
    if (this.appLangs.indexOf(value) >= 0) {
      this.lang = value;
    } else {
      this.lang = this.appLangs[0];
    }
    if (this.dom != null) {
      this.updateMoreElementText();
    }
  }

  public toggleMenu() {
    this.openedMenu = !this.openedMenu;
  }

  public toggleMenuOverflow(doOpenMenu = !this.openedMenuOverflow) {
    if (!this.moreElement) {
      return;
    }

    this.openedMenuOverflow = doOpenMenu;

    if (this.openedMenuOverflow) {
      this.overflowItems.forEach((el: HTMLElement) => (el.style.display = ''));
    } else {
      this.overflowItems.forEach((el: HTMLElement) => (el.style.display = 'none'));
    }
  }

  public hideMenuOverflow() {
    this.toggleMenuOverflow(false);
  }

  public handleOverflowKeyEvent(e: KeyboardEvent) {
    if (e.code === 'Enter' || e.code === 'Space') {
      this.toggleMenuOverflow();
    }
  }

  public computeIsMobile() {
    this.isMobile = this.dom.nativeElement.querySelector('#nav-toggler')?.offsetParent !== null;
  }

  public setUpRefs() {
    this.logoElement = this.dom.nativeElement.querySelector('#logo');
    this.titleElement = this.dom.nativeElement.querySelector('#title');
    this.optionHeaderContentElement = this.dom.nativeElement.querySelector('#optionHeaderContent');
    this.profileMenuElement = this.dom.nativeElement.querySelector('#profileMenu');
    this.intranetSearchElement = this.dom.nativeElement.querySelector('#intranetSearch');
    this.navElement = this.dom.nativeElement.querySelector('#nav');

    if (this.navElement == null) return;

    this.navItems = Array.from(this.navElement.querySelectorAll('.nav-item:not(#more)'));

    this.moreElement = this.navElement.querySelector('#more');

    if (!this.moreElement) {
      this.navElement.insertAdjacentHTML(
        'beforeend',
        `<li tabindex="0" class="nav-item" id="more">
        <span class="nav-link col-auto py-16 px-24"></span>
        </li>`,
      );
      this.moreElement = this.navElement.querySelector('#more');

      if (this.moreElement) {
        this.moreElement.addEventListener('click', () => this.toggleMenuOverflow());
        this.moreElement.addEventListener('keydown', this.handleOverflowKeyEvent);
        this.updateMoreElementText();
      }
    }
  }

  public navigationResize() {
    this.setUpRefs();

    const navItems: Array<HTMLElement> = [];

    if (this.moreElement == null) return;

    // Hide overflow items
    this.toggleMenuOverflow(false);

    // Reset all the nav items
    this.navItems.forEach((el: HTMLElement, index) => {
      el.classList.remove('nav-overflow');
      el.style.transform = '';
      el.style.width = '';
      el.style.display = '';

      navItems[index] = el;
    });

    if (this.isMobile) return;

    // Get available width for the navigation bar
    const availableNavWidth = this.getAvailableNavWidth();

    // Get the total width of the nav items
    const listMargin = 40;
    const navItemWidth = navItems.reduce((acc, el) => acc + el.scrollWidth, 0);
    const showMoreElement = navItemWidth > availableNavWidth;

    // Display the more element if necessary, hide it otherwise
    this.moreElement.style.display = showMoreElement ? '' : 'none';

    // If the navbar is too wide, turn the nav items into overflow items one by one
    if (showMoreElement) {
      let navWidth = navItemWidth + this.moreElement.scrollWidth + listMargin;
      let lastNavItem: HTMLElement;
      let maxWidth = 0;

      while (navWidth > availableNavWidth) {
        lastNavItem = navItems[navItems.length - 1];
        if (lastNavItem === undefined) break;

        navWidth -= lastNavItem.scrollWidth;
        lastNavItem.classList.add('nav-overflow');
        maxWidth = Math.max(maxWidth, Math.ceil(lastNavItem.scrollWidth));

        navItems.pop();
      }

      // Move the "More" element before the overflow items
      this.navElement.insertBefore(this.moreElement, lastNavItem!);

      // Adjust the overflow items
      this.overflowItems.forEach((el: HTMLElement, index) => {
        el.style.transform = `translateY(${index * 100}%)`;
        el.style.width = `${maxWidth}px`;
        el.style.display = 'none';
      });
    }
  }

  public getPostLogoText() {
    return this.localization['postLogo'][this.lang.toLocaleLowerCase()];
  }

  public getPlaceholderSearchIntranet() {
    return this.localization['searchPlaceholder'][this.lang.toLowerCase()];
  }

  public isLanguageActive(lang: string) {
    return this.lang.toLowerCase() === lang.toLowerCase();
  }

  private getAvailableNavWidth(): number {
    if (!this.condenseHeader) {
      return document.documentElement.scrollWidth;
    }

    this.navElement.setAttribute('style', 'display: none !important');
    const availableNavWidth = this.navElement.closest('nav.top-navigation')?.scrollWidth ?? 0;
    this.navElement.removeAttribute('style');

    return availableNavWidth;
  }

  private updateMoreElementText() {
    const languageField = this.dom.nativeElement.querySelector('#more > span');

    // when no navigation bar is displayed theres no 'more' element
    if (!languageField) return;

    languageField.innerText = this.localization['moreLabel'][this.lang.toLowerCase()];
  }

  // Close dropdown on link clicks https://github.com/swisspost/design-system/issues/1300
  private optionDropdownClick() {
    this.optionDropdownElement.nativeElement.querySelectorAll('a').forEach(anchor => {
      anchor.addEventListener('click', () => {
        this.optionDropdown.close();
      });

      anchor.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'enter') this.optionDropdown.close();
      });
    });
  }
}
