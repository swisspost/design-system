import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  LOCALE_ID,
  NgZone,
  OnChanges,
  OnInit,
  SecurityContext,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'sp-intranet-header',
  templateUrl: './swisspost-intranet-header.component.html',
  styleUrls: ['./swisspost-intranet-header.component.scss'],
})
export class SwissPostIntranetHeaderComponent implements OnInit, OnChanges, AfterViewInit {
  @Input()
  siteTitle!: string;
  @Input() languages = 'de,fr,it,en';
  @Input() isPreview = false;
  @Input() currentUserId = 'user';
  @Input()
  displayName!: string;
  @Input()
  additionalInfo!: string;
  @Input() hasNavbar = true;
  @Input() showIntranetSearch = false;
  @Input()
  optionDropdownContent!: TemplateRef<any>;
  @Input()
  optionHeaderContent!: TemplateRef<any>;
  @Input() logoUrl!: string;
  @Input() searchUrl!: string;

  @ViewChild('domWrapper')
  dom!: ElementRef;

  appLangs!: string[];
  avatarUrl = this.createSafeAvatarUrl();
  openedMenu = false;
  openedLangChooser = false;
  openedMenuOverflow = false;

  localization: {
    moreLabel: { [key: string]: string };
    searchPlaceholder: { [key: string]: string };
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
  };

  private windowResize$ = new Subject();
  private moreElement!: HTMLElement;
  private navElement!: HTMLElement;
  private navItems!: Array<HTMLElement>;
  private navChanges!: MutationObserver;

  constructor(
    @Inject(LOCALE_ID) public lang: string,
    private router: Router,
    private zone: NgZone,
    private domSanitizer: DomSanitizer,
  ) {
    this.router.events.subscribe((e) => {
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
      this.navigationResize();
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
    const tempArr = location.href.match(/lang=([a-zA-Z]{2})/);
    if (tempArr && tempArr.length > 1) {
      this.setLang(tempArr[1]);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentUserId']) {
      this.avatarUrl = this.createSafeAvatarUrl();
    }
  }

  ngAfterViewInit(): void {
    // this check is needed, because it would add another element when a link from within "#overflow" is clicked
    if (this.dom.nativeElement.querySelector('#more') == null) {
      const extensionElement = `<li tabindex="0" class="nav-item${
        this.openedMenuOverflow ? '' : ' hidden'
      }" id="more">
                                    <span class="nav-link col-auto py-3 px-4"></span>
                                </li>`;
      this.navElement = this.dom.nativeElement.querySelector('#nav');
      if (this.navElement == null) {
        return;
      }
      this.navItems = Array.from(this.navElement.querySelectorAll('.nav-item'));
      this.navElement.insertAdjacentHTML('beforeend', extensionElement);
      this.moreElement = this.dom.nativeElement.querySelector('#more');
      const toggleElement = this.moreElement.getElementsByTagName('span')[0];
      toggleElement.addEventListener('click', () => this.toggleMenuOverflow());
      // TODO: Discuss this behavior, it should be consistent throughout all dropdowns (nav/more/language)
      // moreElement.addEventListener('blur', () => this.hideMenuOverflow());
      this.moreElement.addEventListener('keydown', (e: KeyboardEvent) =>
        this.handleOverflowKeyEvent(e),
      );
      this.updateMoreElementText();
      this.navigationResize();

      if (!MutationObserver) {
        return;
      }
      this.navChanges = new MutationObserver((mutationList) => {
        if (mutationList.some((mutation) => mutation.type === 'childList')) {
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
              (mutation) =>
                mutation.type === 'characterData' && mutation.target.nodeType === textNodeType,
            )
          ) {
            this.navigationResize();
          }
        }
      });
      this.navChanges.observe(this.navElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
  }

  public handleLanguageChange(lang: string) {
    if (lang !== this.lang) {
      var sanitizedLocationUrl = this.domSanitizer.sanitize(SecurityContext.URL, location.href);
      this.setLang(lang);

      if (!sanitizedLocationUrl) {
        return;
      }

      const currentLoc = sanitizedLocationUrl;
      if (currentLoc.match(/lang=[a-zA-Z]+/)) {
        // lang paramter is already present in url
        location.href = currentLoc.replace(/lang=[a-zA-Z]{2}/, `lang=${lang}`);
      } else {
        // add lang parameter, handle case when a query string is already present or not
        location.href = currentLoc + (currentLoc.indexOf('?') < 0 ? '?' : '&') + `lang=${lang}`;
      }
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
      this.moreElement.classList.remove('hidden');
      this.overflowItems.forEach((el: HTMLElement) => (el.style.display = ''));
    } else {
      this.moreElement.classList.add('hidden');
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

  public navigationResize() {
    const navItems: Array<HTMLElement> = [];

    if (this.moreElement == null) {
      return;
    }

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

    // Get the total width of the nav items
    const listMargin = 40;
    const navItemWidth = navItems.reduce((acc, el) => acc + el.scrollWidth, listMargin);

    // Get document width
    const documentWidth = document.documentElement.scrollWidth;

    // Display the more element if necessary, hide it otherwise
    this.moreElement.style.display = navItemWidth > documentWidth ? '' : 'none';

    // If the navbar is too wide, turn the nav items into overflow items one by one
    if (navItemWidth > documentWidth) {
      let navWidth = navItemWidth + this.moreElement.scrollWidth;
      let lastNavItem: HTMLElement;
      let greaterWidth = 0;

      while (navWidth > documentWidth) {
        lastNavItem = navItems[navItems.length - 1];

        if (lastNavItem === undefined) {
          break;
        }

        lastNavItem.classList.add('nav-overflow');
        const lastNavItemWidth = lastNavItem.getBoundingClientRect().width;

        if (lastNavItemWidth > greaterWidth) {
          greaterWidth = Math.ceil(lastNavItemWidth);
        }

        navWidth -= lastNavItemWidth;
        navItems.pop();
      }

      // Move the "More" element before the overflow items
      this.navElement.insertBefore(this.moreElement, lastNavItem!);

      // Adjust the overflow items
      this.overflowItems.forEach((el: HTMLElement, index) => {
        el.style.transform = `translateY(${index * 100}%)`;
        el.style.width = `${greaterWidth}px`;
        el.style.display = 'none';
      });
    }
  }

  public getPlaceholderSearchIntranet() {
    return this.localization['searchPlaceholder'][this.lang.toLowerCase()];
  }

  public isLanguageActive(lang: string) {
    return this.lang.toLowerCase() === lang.toLowerCase();
  }

  private createSafeAvatarUrl(): SafeUrl {
    const url = `https://web.post.ch/UserProfileImage/${this.currentUserId}.png`;
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  private updateMoreElementText() {
    const languageField = this.dom.nativeElement.querySelector('#more > span');

    // when no navigation bar is displayed theres no 'more' element
    if (!languageField) {
      return;
    }

    languageField.innerText = this.getTextForMoreElement();
  }

  private getTextForMoreElement() {
    return this.localization['moreLabel'][this.lang.toLowerCase()];
  }
}
