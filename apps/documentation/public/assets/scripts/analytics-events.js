if (window.__GTM__) {
  // Page Context
  window.addEventListener('storybook:ready', function () {
    window.dataLayer.push({
      event: 'page_context', // constant, required
      spa: 'true', // constant, required
      content_language: window.__GTM__.get('CONTENT_LANGUAGE'), // required
      content_geo_region: window.__GTM__.get('GEO_REGION'), // required
      source_code_version: window.__GTM__.get('SOURCE_CODE_VERSION'), // recommended
      page_name_language_neutral: window.__GTM__.getPageTitle(), // required
      page_url_language_neutral: window.location.href, // required
      environment: window.__GTM__.getEnvironment(), // required
      login_status: 'false', // required
      platform_name: 'ms_design_system', // required
      department_name: 'IT16.12', // required
      business_unit: 'IT', // required
      primary_segment: 'allgemein', // required
    });
  });

  // Page Change
  window.addEventListener('storybook:routeChange', function () {
    window.dataLayer.push({
      event: 'page_change', // constant, required
      content_language: window.__GTM__.get('CONTENT_LANGUAGE'), // required
      content_geo_region: window.__GTM__.get('GEO_REGION'), // required
      page_name_language_neutral: window.__GTM__.getPageTitle(), // required
      page_url_language_neutral: window.location.href, // required
      virtual_pageview: 'true', // SPA route change indicator, boolean true/false
      virtual_page_name: window.__GTM__.getPageTitle(), // SPA route change/transition new page name/page title
      virtual_url: window.location.href, // SPA route change new URL
    });
  });
}
