import { IKlpWidget } from './login-widget-options.model';

export type Environment = 'dev01' | 'dev02' | 'devs1' | 'test' | 'int01' | 'int02' | 'prod';

declare global {
  interface Window {
    OPPklpWidget: IKlpWidget;
    klpWidgetDev: (...args: unknown[]) => IKlpWidget;
    jQuery: unknown;
    $: unknown;
    vertx: unknown;
    dataLayer: unknown[];
  }
}
