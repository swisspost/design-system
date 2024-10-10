import React, { useEffect, useState } from 'react';
import { IconButton, WithTooltip } from '@storybook/components';

const THEMES = ['Post'] as const;
const CHANNELS = ['External', 'Internal'] as const;
const MODES = ['Light', 'Dark'] as const;

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
 * Backgrounds
 */
const backgroundClasses: { [key in (typeof MODES)[number]]: string } = {
  Light: 'bg-white',
  Dark: 'bg-dark',
};
const getBackgroundClass = (mode: string) => {
  return mode in backgroundClasses ? backgroundClasses[mode] : '';
};
const possibleBackgrounds = MODES.map(mode => getBackgroundClass(mode));

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
  const [currentMode, setCurrentMode] = useState<string>(stored('mode') || MODES[0]);

  const [preview, setPreview] = useState<Document>();
  const [stories, setStories] = useState<NodeListOf<Element>>();

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
   * Sets the expected 'data-color-mode' attribute on all story containers when the mode changes
   */
  useEffect(() => {
    if (!stories) return;

    stories.forEach(story => {
      story.classList.remove(...possibleBackgrounds);
      story.classList.add(getBackgroundClass(currentMode));
      story.setAttribute('data-color-mode', currentMode.toLowerCase());
    });
  }, [stories, currentMode]);

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
   * Applies selected mode and registers it to the local storage
   */
  const applyMode = (mode: string) => {
    store('mode', mode);
    setCurrentMode(mode);
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
          Chanel: {currentChannel}
        </IconButton>
      </WithTooltip>

      {/* Mode dropdown */}
      <WithTooltip
        placement="bottom-end"
        trigger="click"
        closeOnOutsideClick
        tooltip={
          <div className="addon-dropdown">
            {MODES.map(mode => (
              <IconButton
                className={'addon-dropdown__item' + (mode === currentMode ? ' active' : '')}
                key={mode}
                onClick={() => applyMode(mode)}
              >
                {mode}
              </IconButton>
            ))}
          </div>
        }
      >
        <IconButton className="addon-label" size="medium">
          Mode: {currentMode}
        </IconButton>
      </WithTooltip>
    </>
  );
}

export default StylesSwitcher;
