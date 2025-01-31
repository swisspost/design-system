import React, { useEffect, useState } from 'react';
import { IconButton, WithTooltip } from '@storybook/components';

const THEMES = ['Post', 'Cargo'] as const;
const CHANNELS = ['External', 'Internal'] as const;
const SCHEMES = ['Light', 'Dark'] as const;

/*
 * Stylesheets
 */
const getStylesheetUrl = (theme: string, channel: string) => {
  return `/styles/${theme.toLowerCase()}-${channel.toLowerCase()}.css`;
};
const possibleStylesheets = THEMES.flatMap(theme => {
  return CHANNELS.map(channel => getStylesheetUrl(theme, channel));
});

/*
 * Local storage access
 */
const STORAGE_KEY_PREFIX = 'swisspost-documentation';
const store = (key: string, value: string) => {
  return localStorage.setItem(`${STORAGE_KEY_PREFIX}-${key}`, value);
};
const stored = (key: string): string => {
  return localStorage.getItem(`${STORAGE_KEY_PREFIX}-${key}`);
};

/*
 * Helpers
 */
const debounce = <T extends unknown[]>(callback: (...args: T) => void, timeout: number) => {
  let timer;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
};

function StylesSwitcher() {
  let observer: MutationObserver;

  const [currentTheme, setCurrentTheme] = useState<string>(stored('theme') || THEMES[0]);
  const [currentChannel, setCurrentChannel] = useState<string>(stored('channel') || CHANNELS[0]);
  const [currentScheme, setCurrentScheme] = useState<string>(stored('scheme') || SCHEMES[0]);

  const [preview, setPreview] = useState<Document>();
  const [stories, setStories] = useState<NodeListOf<Element>>();
  const [stylesCodeBlocks, setStylesCodeBlocks] = useState<NodeListOf<Element>>();

  /**
   * Retrieves the preview document after the first rendering
   */
  useEffect(() => {
    const previewIFrame = document.querySelector('iframe#storybook-preview-iframe');

    if (!previewIFrame) return;

    previewIFrame.addEventListener('load', () => {
      setPreview((previewIFrame as HTMLIFrameElement).contentWindow.document);
    });
  }, []);

  /**
   * Retrieves all the stories when the preview content changes
   */
  useEffect(() => {
    if (!preview || observer) return;

    observer = new MutationObserver(
      debounce(() => {
        setStories(preview.querySelectorAll('.sbdocs-preview, .sb-main-padded'));
        setStylesCodeBlocks(preview.querySelectorAll('.docblock-source'));
      }, 200),
    );

    observer.observe(preview.body, { childList: true, subtree: true });
  }, [preview]);

  /**
   * Sets the expected stylesheet in the preview head when the theme or channel changes
   */
  useEffect(() => {
    if (!preview) return;

    possibleStylesheets.forEach(stylesheet => {
      const stylesheetLink = preview.head.querySelector(`link[href="${stylesheet}"]`);
      if (stylesheetLink) stylesheetLink.remove();
    });

    preview.head.insertAdjacentHTML(
      'beforeend',
      `<link rel="stylesheet" href="${getStylesheetUrl(currentTheme, currentChannel)}" />`,
    );
  }, [preview, currentTheme, currentChannel]);

  /**
   * Sets the design system styles import SCSS file to the correct theme and channel file
   */
  useEffect(() => {
    if (!stylesCodeBlocks) return;

    const t = currentTheme.toLowerCase();
    const c = currentChannel.toLowerCase();
    const packageName = "'@swisspost/design-system-styles/";

    stylesCodeBlocks.forEach(stylesCodeBlock => {
      const sourceArray = Array.from(stylesCodeBlock.querySelectorAll('.token.string'));
      sourceArray.forEach((s, i) => {
        let source = s.innerHTML;
        // Remove the packageName from the source to make sure we don't override it
        source = source.replace(packageName, '');

        // Check if one of the themes or channels are in the scss path
        const theme = THEMES.find(tItem => source.indexOf(tItem.toLowerCase()) > -1);
        const channel = CHANNELS.find(cItem => source.indexOf(cItem.toLowerCase()) > -1);

        const updateTheme = theme && theme.toLowerCase() !== t;
        const updateChannel = channel && channel.toLowerCase() !== c;

        // Only change the source if theme or channel needs to be changed
        if (source && (updateTheme || updateChannel)) {
          if (updateTheme) {
            source = source.replace((theme as string).toLowerCase(), t);
          }

          if (updateChannel) {
            source = source.replace((channel as string).toLowerCase(), c);
          }

          sourceArray[i].innerHTML = packageName + source;
        }
      });
    });
  }, [stylesCodeBlocks, currentTheme, currentChannel]);

  /**
   * Sets the expected 'data-color-scheme' attribute on all story containers when the scheme changes
   */
  useEffect(() => {
    if (!stories) return;

    stories.forEach(story => {
      story.setAttribute('data-color-scheme', currentScheme.toLowerCase());
      if (!story.classList.contains('palette-default')) story.classList.add('palette-default');
    });
  }, [stories, currentScheme]);

  /**
   * Applies selected theme and registers it to the local storage
   */
  const applyTheme = (theme: string) => {
    store('theme', theme);
    setCurrentTheme(theme);
  };

  /**
   * Applies selected channel and registers it to the local storage
   */
  const applyChannel = (channel: string) => {
    store('channel', channel);
    setCurrentChannel(channel);
  };

  /**
   * Applies selected scheme and registers it to the local storage
   */
  const applyScheme = (scheme: string) => {
    store('scheme', scheme);
    setCurrentScheme(scheme);
  };

  return (
    <>
      {/* Theme dropdown */}
      <WithTooltip
        placement="bottom-end"
        trigger="click"
        closeOnOutsideClick
        tooltip={
          <div className="addon-dropdown">
            {THEMES.map(theme => (
              <IconButton
                className={'addon-dropdown__item' + (theme === currentTheme ? ' active' : '')}
                key={theme}
                onClick={() => applyTheme(theme)}
              >
                {theme}
              </IconButton>
            ))}
          </div>
        }
      >
        <IconButton className="addon-label" size="medium">
          Theme: {currentTheme}
        </IconButton>
      </WithTooltip>

      {/* Channel dropdown */}
      <WithTooltip
        placement="bottom-end"
        trigger="click"
        closeOnOutsideClick
        tooltip={
          <div className="addon-dropdown">
            {CHANNELS.map(channel => (
              <IconButton
                className={'addon-dropdown__item' + (channel === currentChannel ? ' active' : '')}
                key={channel}
                onClick={() => applyChannel(channel)}
              >
                {channel}
              </IconButton>
            ))}
          </div>
        }
      >
        <IconButton className="addon-label" size="medium">
          Channel: {currentChannel}
        </IconButton>
      </WithTooltip>

      {/* Scheme dropdown */}
      <WithTooltip
        placement="bottom-end"
        trigger="click"
        closeOnOutsideClick
        tooltip={
          <div className="addon-dropdown">
            {SCHEMES.map(scheme => (
              <IconButton
                className={'addon-dropdown__item' + (scheme === currentScheme ? ' active' : '')}
                key={scheme}
                onClick={() => applyScheme(scheme)}
              >
                {scheme}
              </IconButton>
            ))}
          </div>
        }
      >
        <IconButton className="addon-label" size="medium">
          Color Scheme: {currentScheme}
        </IconButton>
      </WithTooltip>
    </>
  );
}

export default StylesSwitcher;
