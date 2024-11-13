import Script from 'next/script';
import settings from './settings.json';

export default function HeaderSettingScript() {
  return (
    <Script
      id="PPM_HEADER_DATA"
      type="application/json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(settings),
      }}
    ></Script>
  );
}
