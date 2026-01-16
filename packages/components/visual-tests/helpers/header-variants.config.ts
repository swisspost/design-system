export interface VariantConfig {
  slots: string[];
  hasGlobalHeader: boolean;
  hasUserMenu: boolean;
  hasMegadropdown: boolean;
  hasAudience: boolean;
  hasGlobalNavSecondary: boolean;
  hasGlobalNavPrimary: boolean;
  hasLocalNavigation: boolean;
  hasGlobalLogin: boolean;
  features: string[];
}

export const HEADER_VARIANTS: Record<string, VariantConfig> = {
  'onepager': {
    slots: ['post-logo', 'language-menu', 'title'],
    hasGlobalHeader: false,
    hasUserMenu: false,
    hasMegadropdown: false,
    hasAudience: false,
    hasGlobalNavSecondary: false,
    hasGlobalNavPrimary: false,
    hasLocalNavigation: false,
    hasGlobalLogin: false,
    features: ['language-menu-list-mode'],
  },
  
  'microsite-loggedout': {
    slots: ['post-logo', 'language-menu', 'main-nav', 'local-nav', 'title'],
    hasGlobalHeader: false,
    hasUserMenu: false,
    hasMegadropdown: true,
    hasAudience: false,
    hasGlobalNavSecondary: false,
    hasGlobalNavPrimary: false,
    hasLocalNavigation: true,
    hasGlobalLogin: false,
    features: ['main-navigation', 'local-login'],
  },
  
  'microsite-loggedin': {
    slots: ['post-logo', 'language-menu', 'main-nav', 'local-nav', 'title'],
    hasGlobalHeader: false,
    hasUserMenu: true,
    hasMegadropdown: true,
    hasAudience: false,
    hasGlobalNavSecondary: false,
    hasGlobalNavPrimary: false,
    hasLocalNavigation: true,
    hasGlobalLogin: false,
    features: ['main-navigation', 'local-user-menu'],
  },
  
  'jobs-loggedout': {
    slots: ['post-logo', 'audience', 'global-nav-secondary', 'language-menu', 'main-nav', 'local-nav'],
    hasGlobalHeader: true,
    hasUserMenu: false,
    hasMegadropdown: true,
    hasAudience: true,
    hasGlobalNavSecondary: true,
    hasGlobalNavPrimary: false,
    hasLocalNavigation: true,
    hasGlobalLogin: false,
    features: ['audience', 'global-nav-secondary', 'main-navigation', 'local-login'],
  },
  
  'jobs-loggedin': {
    slots: ['post-logo', 'audience', 'global-nav-secondary', 'language-menu', 'main-nav', 'local-nav'],
    hasGlobalHeader: true,
    hasUserMenu: true,
    hasMegadropdown: true,
    hasAudience: true,
    hasGlobalNavSecondary: true,
    hasGlobalNavPrimary: false,
    hasLocalNavigation: true,
    hasGlobalLogin: false,
    features: ['audience', 'global-nav-secondary', 'main-navigation', 'local-user-menu'],
  },
  
  'portal-loggedout': {
    slots: ['post-logo', 'audience', 'global-nav-primary', 'global-nav-secondary', 'language-menu', 'post-login', 'main-nav'],
    hasGlobalHeader: true,
    hasUserMenu: false,
    hasMegadropdown: true,
    hasAudience: true,
    hasGlobalNavSecondary: true,
    hasGlobalNavPrimary: true,
    hasLocalNavigation: false,
    hasGlobalLogin: true,
    features: ['audience', 'global-nav-primary', 'global-nav-secondary', 'main-navigation', 'global-login-link'],
  },
  
  'portal-loggedin': {
    slots: ['post-logo', 'audience', 'global-nav-primary', 'global-nav-secondary', 'language-menu', 'post-login', 'main-nav'],
    hasGlobalHeader: true,
    hasUserMenu: true,
    hasMegadropdown: true,
    hasAudience: true,
    hasGlobalNavSecondary: true,
    hasGlobalNavPrimary: true,
    hasLocalNavigation: false,
    hasGlobalLogin: false,
    features: ['audience', 'global-nav-primary', 'global-nav-secondary', 'main-navigation', 'global-user-menu'],
  },
};

/**
 * Get list of variants that share a specific feature
 */
export function getVariantsWithFeature(feature: string): string[] {
  return Object.entries(HEADER_VARIANTS)
    .filter(([_, config]) => config.features.includes(feature))
    .map(([name]) => name);
}

/**
 * Get unique features that distinguish one variant from others
 */
export function getUniqueFeatures(variantName: string): string[] {
  const variant = HEADER_VARIANTS[variantName];
  const otherVariants = Object.entries(HEADER_VARIANTS)
    .filter(([name]) => name !== variantName);
  
  return variant.features.filter(feature => 
    !otherVariants.some(([_, config]) => config.features.includes(feature))
  );
}