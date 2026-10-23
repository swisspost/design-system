import { PreConfiguredHeaderPage } from '../pre-configured-header-page';

export default function ApiConfig() {
  return (
    <PreConfiguredHeaderPage title="Pre-configured header: config from the header API">
      <p>
        The header fetches the config of the <code>design-system</code> project from the{' '}
        <code>int02</code> header API.
      </p>
    </PreConfiguredHeaderPage>
  );
}
