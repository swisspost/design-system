/**
 * Header Variant Configuration
 * Defines all header variants and their specific features/slots
 */

export interface VariantConfig {
  slots: string[];
  hasGlobalHeader: boolean;
  hasUserMenu: boolean;
  hasMegadropdown: boolean;
  hasTargetGroup: boolean;
  hasMetaNavigation: boolean;
  hasLocalNavigation: boolean;
  hasGlobalLogin: boolean;
  features: string[];
}

export const HEADER_VARIANTS: Record<string, VariantConfig> = {
  'onepager': {
    slots: ['post-logo', 'post-language-switch', 'title'],
    hasGlobalHeader: false,
    hasUserMenu: false,
    hasMegadropdown: false,
    hasTargetGroup: false,
    hasMetaNavigation: false,
    hasLocalNavigation: false,
    hasGlobalLogin: false,
    features: ['language-menu-list-mode'],
  },
  
  'microsite-loggedout': {
    slots: ['post-logo', 'post-language-switch', 'post-mainnavigation', 'local-nav', 'title'],
    hasGlobalHeader: false,
    hasUserMenu: false,
    hasMegadropdown: true,
    hasTargetGroup: false,
    hasMetaNavigation: false,
    hasLocalNavigation: true,
    hasGlobalLogin: false,
    features: ['main-navigation', 'local-login'],
  },
  
  'microsite-loggedin': {
    slots: ['post-logo', 'post-language-switch', 'post-mainnavigation', 'local-nav', 'title'],
    hasGlobalHeader: false,
    hasUserMenu: true,
    hasMegadropdown: true,
    hasTargetGroup: false,
    hasMetaNavigation: false,
    hasLocalNavigation: true,
    hasGlobalLogin: false,
    features: ['main-navigation', 'local-user-menu'],
  },
  
  'jobs-loggedout': {
    slots: ['post-logo', 'target-group', 'meta-navigation', 'post-language-switch', 'post-mainnavigation', 'local-nav'],
    hasGlobalHeader: true,
    hasUserMenu: false,
    hasMegadropdown: true,
    hasTargetGroup: true,
    hasMetaNavigation: true,
    hasLocalNavigation: true,
    hasGlobalLogin: false,
    features: ['target-group', 'meta-navigation', 'main-navigation', 'local-login'],
  },
  
  'jobs-loggedin': {
    slots: ['post-logo', 'target-group', 'meta-navigation', 'post-language-switch', 'post-mainnavigation', 'local-nav'],
    hasGlobalHeader: true,
    hasUserMenu: true,
    hasMegadropdown: true,
    hasTargetGroup: true,
    hasMetaNavigation: true,
    hasLocalNavigation: true,
    hasGlobalLogin: false,
    features: ['target-group', 'meta-navigation', 'main-navigation', 'local-user-menu'],
  },
  
  'portal-loggedout': {
    slots: ['post-logo', 'target-group', 'global-controls', 'meta-navigation', 'post-language-switch', 'global-login', 'post-mainnavigation'],
    hasGlobalHeader: true,
    hasUserMenu: false,
    hasMegadropdown: true,
    hasTargetGroup: true,
    hasMetaNavigation: true,
    hasLocalNavigation: false,
    hasGlobalLogin: true,
    features: ['target-group', 'global-controls', 'meta-navigation', 'main-navigation', 'global-login-link'],
  },
  
  'portal-loggedin': {
    slots: ['post-logo', 'target-group', 'global-controls', 'meta-navigation', 'post-language-switch', 'post-mainnavigation'],
    hasGlobalHeader: true,
    hasUserMenu: true,
    hasMegadropdown: true,
    hasTargetGroup: true,
    hasMetaNavigation: true,
    hasLocalNavigation: false,
    hasGlobalLogin: false,
    features: ['target-group', 'global-controls', 'meta-navigation', 'main-navigation', 'global-user-menu'],
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