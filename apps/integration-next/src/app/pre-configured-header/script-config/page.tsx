import testConfiguration from '@swisspost/internet-header/dist/swisspost-internet-header/assets/config/test-configuration.json';
import { PreConfiguredHeaderPage } from '../pre-configured-header-page';

// Escaped, so no `</script>` inside the config can end the tag early.
const headerData = JSON.stringify(testConfiguration).replaceAll('<', '\\u003c');

export default function ScriptConfig() {
  return (
    <>
      {/* The header prefers this config over the API, so it never calls the API on this page. */}
      <script
        id="PPM_HEADER_DATA"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: headerData }}
      />
      <PreConfiguredHeaderPage title="Pre-configured header: config from a script tag">
        <p>
          The header reads its config from the <code>#PPM_HEADER_DATA</code> script tag, which holds
          the header&apos;s test configuration.
        </p>
      </PreConfiguredHeaderPage>
    </>
  );
}
