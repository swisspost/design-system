if (globalThis.__GTM__) {
  // Page Context
  globalThis.addEventListener('storybook:ready', function () {
    globalThis.dataLayer.push({
      event: 'page_context', // constant, required
      spa: 'true', // constant, required
      content_language: globalThis.__GTM__.get('CONTENT_LANGUAGE'), // required
      content_geo_region: globalThis.__GTM__.get('GEO_REGION'), // required
      source_code_version: globalThis.__GTM__.get('SOURCE_CODE_VERSION'), // recommended
      page_name_language_neutral: globalThis.__GTM__.getPageTitle(), // required
      page_url_language_neutral: globalThis.location.href, // required
      environment: globalThis.__GTM__.getEnvironment(), // required
      login_status: 'false', // required
      platform_name: 'ms_design_system', // required
      department_name: 'IT16.12', // required
      business_unit: 'IT', // required
      primary_segment: 'allgemein', // required
    });
  });

  // Page Change
  globalThis.addEventListener('storybook:routeChange', function () {
    globalThis.dataLayer.push({
      event: 'page_change', // constant, required
      content_language: globalThis.__GTM__.get('CONTENT_LANGUAGE'), // required
      content_geo_region: globalThis.__GTM__.get('GEO_REGION'), // required
      page_name_language_neutral: globalThis.__GTM__.getPageTitle(), // required
      page_url_language_neutral: globalThis.location.href, // required
      virtual_pageview: 'true', // SPA route change indicator, boolean true/false
      virtual_page_name: globalThis.__GTM__.getPageTitle(), // SPA route change/transition new page name/page title
      virtual_url: globalThis.location.href, // SPA route change new URL
    });
  });
}
