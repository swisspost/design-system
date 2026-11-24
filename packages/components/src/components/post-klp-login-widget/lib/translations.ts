import type { KlpLanguage, KlpLink } from './links';

export type KlpTranslation = KlpLink | 'unreadMessages' | 'accessUserLinks';

/** The translations of the global Swiss Post header (Header API, 2026-11). */
export const KLP_TRANSLATIONS: Record<KlpLanguage, Record<KlpTranslation, string>> = {
  de: {
    login: 'Login',
    accountSwitch: 'Benutzerkonto wechseln',
    companySwitch: 'Unternehmen wechseln',
    myProfile: 'Mein Profil',
    messages: 'Nachrichten',
    unreadMessages: 'ungelesene Nachrichten',
    settings: 'Einstellungen',
    logout: 'Logout',
    accessUserLinks: 'Benutzermenü öffnen',
  },
  fr: {
    login: 'Login',
    accountSwitch: 'Changer de compte',
    companySwitch: 'Changer d’entreprise',
    myProfile: 'Mon profil',
    messages: 'Messages',
    unreadMessages: 'messages non lus',
    settings: 'Paramètres',
    logout: 'Logout',
    accessUserLinks: 'Ouvrir le menu utilisateur',
  },
  it: {
    login: 'Login',
    accountSwitch: 'Cambia account',
    companySwitch: 'Cambia azienda',
    myProfile: 'Il mio profilo',
    messages: 'Messaggi',
    unreadMessages: 'messaggi non letti',
    settings: 'Impostazioni',
    logout: 'Logout',
    accessUserLinks: 'Apri il menu utente',
  },
  en: {
    login: 'Login',
    accountSwitch: 'Switch account',
    companySwitch: 'Switch company',
    myProfile: 'My Profile',
    messages: 'Inbox',
    unreadMessages: 'unread messages',
    settings: 'Settings',
    logout: 'Logout',
    accessUserLinks: 'Open user menu',
  },
};
