import '../../assets/js/klp-login-widget.js';
import { ILoginWidgetOptions } from '../../models/header.model.js';

export const initializeKLPLoginWidget = (containerId: string, options: ILoginWidgetOptions) => {
  if (options === undefined) return;

  try {
    // @ts-expect-error - klpWidgetDev is of type unknown
    window.OPPklpWidget = window.klpWidgetDev(
      containerId,
      options.applicationId,
      options.serviceId,
      options.appLoginUrl,
      null, // would be menulinks, but they are not provided anymore from Post-Portal
      options.currentLang,
      options.platform,
      options.options,
      options.environment,
    );
  } catch (error) {
    console.error(error);
  }
};
