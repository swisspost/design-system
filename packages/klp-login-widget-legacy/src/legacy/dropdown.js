/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * The account menu: opening it, closing it, and walking it with the arrow keys.
 *
 * Everything here reaches into the widget through selectFromShadowDom(), which is a jQuery set
 * scoped to the shadow root. That is the only reason these functions can find their own markup,
 * and the reason closeDropdowns() has to be a stable reference: it is bound and unbound on the
 * document by identity.
 * ------------------------------------------------------------------------------------------------
 */

import jQuery from 'jquery/dist/jquery.slim';

const $ = jQuery;

const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const ESCAPE = 27;

export function createDropdown({ id, selectFromShadowDom }) {
  function toggleDropdown(dropdownToToggle) {
    if (dropdownToToggle.is(':visible')) {
      selectFromShadowDom()
        .find('#' + id)
        .removeClass('bubble');
      closeDropdowns();
      return;
    }

    closeDropdowns();
    selectFromShadowDom()
      .find('.' + dropdownToToggle.attr('data-dropdown-toggler'))
      .attr('aria-expanded', true);
    selectFromShadowDom()
      .find('#' + id)
      .addClass('bubble');
    dropdownToToggle.show();
    $(document).on('click', closeDropdowns);

    if (dropdownToToggle.hasClass('klp-widget-authenticated-menu')) {
      dropdownToToggle
        .parent()
        .removeClass('klp-widget-menu-close')
        .addClass('klp-widget-menu-open');
    }
  }

  function closeDropdowns(e) {
    if (e != null) {
      // Meant to keep clicks inside the widget from closing it. Shadow DOM retargeting means
      // e.target is the host element, so this guard never holds and the menu always collapses.
      if (
        selectFromShadowDom()
          .find(e.target)
          .parents('#' + id).length > 0
      ) {
        return;
      }
    }

    selectFromShadowDom().find(document).off('click', closeDropdowns);
    selectFromShadowDom()
      .find('#' + id)
      .removeClass('bubble');
    selectFromShadowDom()
      .find('#' + id + ' .klp-widget-authenticated-menu')
      .hide()
      .parent()
      .removeClass('klp-widget-menu-open')
      .addClass('klp-widget-menu-close');
    selectFromShadowDom()
      .find(
        '.' +
          selectFromShadowDom()
            .find('#' + id + ' .klp-widget-authenticated-menu')
            .attr('data-dropdown-toggler'),
      )
      .attr('aria-expanded', false);
  }

  function setArrowKeysListeners() {
    selectFromShadowDom()
      .find('.klp-widget__user')
      .on('keydown', function (event) {
        if (event.which < ARROW_LEFT || event.which > ARROW_DOWN) {
          return;
        }
        event.preventDefault();

        const parent = selectFromShadowDom().find(this).parent();
        const dropdown = selectFromShadowDom().find(
          '.' + selectFromShadowDom().find(this).attr('data-dropdown'),
        );

        switch (event.which) {
          case ARROW_LEFT:
            if (parent.prev().length) {
              parent.prev().find('a').focus();
            }
            if (dropdown.is(':visible')) {
              selectFromShadowDom().find(this).click();
            }
            break;
          case ARROW_UP:
            if (dropdown.is(':visible')) {
              selectFromShadowDom().find(this).click();
            }
            break;
          case ARROW_RIGHT:
            if (parent.next().length) {
              parent.next().find('a').focus();
            }
            if (dropdown.is(':visible')) {
              selectFromShadowDom().find(this).click();
            }
            break;
          case ARROW_DOWN:
            if (!dropdown.is(':visible')) {
              selectFromShadowDom().find(this).click();
            }
            dropdown.find('li:first a').focus();
            break;
        }
      });

    selectFromShadowDom()
      .find('.klp-widget-authenticated-menu')
      .on('keydown', 'a', function (event) {
        if (event.which < ARROW_LEFT || event.which > ARROW_DOWN) {
          return;
        }
        event.preventDefault();

        const parent = selectFromShadowDom().find(this).parent();
        const dropdownToggler = selectFromShadowDom().find(
          '.' +
            selectFromShadowDom().find(this).parents('div').first().attr('data-dropdown-toggler'),
        );

        switch (event.which) {
          case ARROW_LEFT:
          case ARROW_UP:
            if (parent.prev('li').length > 0) {
              parent.prev('li').find('a').focus();
            } else {
              dropdownToggler.click().focus();
            }
            break;
          case ARROW_RIGHT:
          case ARROW_DOWN:
            if (parent.next('li').length > 0) {
              parent.next('li').find('a').focus();
            }
            break;
        }
      });

    $('body').on('keydown', function (event) {
      if (event.which !== ESCAPE) {
        return;
      }
      closeDropdowns();
    });
  }

  return { toggleDropdown, closeDropdowns, setArrowKeysListeners };
}
