import React, { useEffect, useState } from 'react';
import { IconButton, WithTooltip } from '@storybook/components';

const STYLESHEET_ID = 'preview-stylesheet';
const STORAGE_KEY_PREFIX = 'swisspost-documentation';
const THEMES = ['Post'];
const CHANNELS = ['External', 'Internal'];
const MODES = ['Light', 'Dark'];

function StylesSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<string>(
    localStorage.getItem(`${STORAGE_KEY_PREFIX}-theme`) || THEMES[0],
  );
  const [currentChannel, setCurrentChannel] = useState<string>(
    localStorage.getItem(`${STORAGE_KEY_PREFIX}-channel`) || CHANNELS[0],
  );
  const [currentMode, setCurrentMode] = useState<string>(
    localStorage.getItem(`${STORAGE_KEY_PREFIX}-mode`) || MODES[0],
  );

  /**
   * Sets the 'data-color-mode' attribute and preview stylesheet when the addon initializes
   */
  useEffect(() => {
    setPreviewStylesheet();
    setDataColorModeAttribute();
  });

  /**
   * Sets the stylesheet matching the selected theme and channel in the preview document head
   */
  const setPreviewStylesheet = () => {
    const preview = getPreviewDocument();
    const previewHead = preview && preview.querySelector('head');

    if (!previewHead) return;

    let stylesheetLink = previewHead.querySelector(`#${STYLESHEET_ID}`);

    if (!stylesheetLink) {
      stylesheetLink = document.createElement('link');
      stylesheetLink.setAttribute('rel', 'stylesheet');
      stylesheetLink.setAttribute('id', STYLESHEET_ID);
      previewHead.appendChild(stylesheetLink);
    }

    stylesheetLink.setAttribute(
      'href',
      `/styles/${currentTheme.toLowerCase()}-${currentChannel.toLowerCase()}.css`,
    );
  };

  /**
   * Sets the 'data-color-mode' attribute of the preview body to match the selected mode
   */
  const setDataColorModeAttribute = () => {
    const preview = getPreviewDocument();
    if (!preview) return;

    const mode = currentMode.toLowerCase();
    const storyContainers = preview.querySelectorAll('.sbdocs-preview, .sb-main-padded');
    storyContainers.forEach(storyContainer => {
      storyContainer.classList.remove('bg-light', 'bg-dark');
      storyContainer.classList.add(`bg-${mode}`);
      storyContainer.setAttribute('data-color-mode', mode);
    });
  };

  /**
   * Returns the Document contained in the preview iframe
   */
  const getPreviewDocument = (): Document | undefined => {
    const preview = document.querySelector('#storybook-preview-iframe');
    return preview && (preview as HTMLIFrameElement).contentWindow.document;
  };

  /**
   * Applies selected theme and registers it to the local storage
   */
  const applyTheme = (theme: string) => {
    setCurrentTheme(theme);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}-theme`, theme);
  };

  /**
   * Applies selected channel and registers it to the local storage
   */
  const applyChannel = (channel: string) => {
    setCurrentChannel(channel);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}-channel`, channel);
  };

  /**
   * Applies selected mode and registers it to the local storage
   */
  const applyMode = (mode: string) => {
    setCurrentMode(mode);
    localStorage.setItem(`${STORAGE_KEY_PREFIX}-mode`, mode);
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
        <IconButton size="medium">Theme: {currentTheme}</IconButton>
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
        <IconButton size="medium">Chanel: {currentChannel}</IconButton>
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
        <IconButton size="medium">Mode: {currentMode}</IconButton>
      </WithTooltip>
    </>
  );
}

export default StylesSwitcher;
