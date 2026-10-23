'use client';

import { defineCustomElements } from '@swisspost/internet-header/loader';
import { useEffect } from 'react';

export function InternetHeader() {
  useEffect(() => {
    void defineCustomElements();
  }, []);

  // Kebab-case attributes, because React renders custom element props as they are named.
  return (
    <swisspost-internet-header
      project="design-system"
      environment="int02"
      language="en"
      text-main="Main"
      text-menu="Menu"
      text-change-language="Change the language"
      text-current-language="The currently selected language is {name}."
      text-current-user="Current user is {user}."
      text-access-user-links="Access user links"
      text-user-links="User links"
      text-close="Close"
      text-back="Back"
    ></swisspost-internet-header>
  );
}
