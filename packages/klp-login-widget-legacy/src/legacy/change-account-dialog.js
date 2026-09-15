/*
 * ------------------------------------------------------------------------------------------------
 * Copyright 2014 by Swiss Post, Information Technology Services
 * ------------------------------------------------------------------------------------------------
 * The confirmation asked before switching company or account.
 *
 * Switching means logging out and coming back through the platform, so the dialog is really a
 * warning about an interrupted session. Which text it shows and where it sends the user depends
 * on whether the session is a support session: support staff cannot switch, they can only leave.
 * ------------------------------------------------------------------------------------------------
 */

export function createChangeAccountDialog({
  id,
  selectFromShadowDom,
  labels,
  getSessionData,
  isChangeUserAndProfile,
  logoutURL,
  changeCompanyURL,
  doLogout,
}) {
  function setChangeAccountDialog() {
    selectFromShadowDom()
      .find('#' + id + ' #klp-widget-authenticated-menu-changecompany')
      .on('click touch', function (e) {
        e.preventDefault();
        selectFromShadowDom()
          .find('#' + id + ' #klp-widget-authenticated-menu-changecompany')
          .focus();
        changeAccountDialog();
        return false;
      });
  }

  function changeAccountDialog() {
    const sessionData = getSessionData();
    let body;
    let logoutUrl;

    if (sessionData?.support) {
      // A support session cannot be switched, only ended.
      body = isChangeUserAndProfile()
        ? labels.text('change-account-support-dialog')
        : labels.text('change-company-support-dialog');
      logoutUrl = logoutURL();
    } else {
      body = isChangeUserAndProfile()
        ? labels.text('change-account-confirm-dialog')
        : labels.text('change-company-confirm-dialog');
      logoutUrl = changeCompanyURL();
    }

    // Guards against a second dialog, but looks for an id the markup never carries, so repeated
    // clicks stack modals on top of each other.
    if (
      selectFromShadowDom().find('#' + id + ' #klp-widget-authenticated-changecompanydialog')
        .length === 0
    ) {
      // The body text is not plain text: it closes this paragraph and brings its own footer,
      // including the #klp-widget-authenticated-dochangecompany button wired up below.
      const changecompanyDialog =
        '<div id="changeAccountModal" class="modal"><div class="modal-content"><div class="modal-text-container row"><div class="col-12 text-align-center"><i class="pi pi-2086"></i></div><span class="close">&times;</span><div class="col-1"></div><div class="col-10 text-align-center"><p class="modal-text">' +
        body +
        '</div></div></div>';
      selectFromShadowDom()
        .find('#' + id + ' .klp-widget-authenticated')
        .append(changecompanyDialog);

      let modal = selectFromShadowDom().find('#changeAccountModal');
      if (modal.length && modal.length >= 1) {
        modal = modal[0];
      }
      modal.style.display = 'table';

      const span = selectFromShadowDom().find('#changeAccountModal .close')[0];

      span.onclick = function () {
        modal.parentElement.removeChild(modal);
      };

      // Click outside to dismiss. Shadow DOM retargets the event to the host, so the comparison
      // against a node inside the shadow root never holds.
      window.onclick = function (event) {
        if (event.target === modal) {
          modal.parentElement.removeChild(modal);
        }
      };

      selectFromShadowDom()
        .find('#klp-widget-authenticated-dochangecompany')
        .on('click touch', function (e) {
          e.preventDefault();
          selectFromShadowDom()
            .find('#' + id + ' #klp-widget-authenticated-dochangecompany')
            .focus();
          doLogout(logoutUrl);
          return false;
        });
    }
  }

  return { setChangeAccountDialog, changeAccountDialog };
}
