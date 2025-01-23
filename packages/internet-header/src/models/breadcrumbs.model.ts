import { IIconConfig } from './header.model';

export interface IBreadcrumbConfig {
  a11yLabel: string;
  asWebComponent: boolean;
  buttons: IBreadcrumbButton[];
  isCentered: boolean;
  items: IBreadcrumbItem[];
  svgIconArrowRightSmall: IIconConfig;
  svgIconHome: IIconConfig;
  truncateButtonText: string;
  classes: string[];
  additionalAttributes: unknown[];
}

export interface IBreadcrumbButton {
  svgIcon: IIconConfig;
  text: string;
  overlay: IBreadcrumbOverlay;
  classes: string[];
  additionalAttributes: unknown[];
}

export interface IBreadcrumbOverlay {
  id: string;
  target: string;
  closeText: string;
  closeIcon: IIconConfig;
  classes: string[];
  additionalAttributes: unknown[];
}

export interface AdditionalAttribute {
  name: string;
  value: string;
}

export interface IBreadcrumbItem {
  text: string;
  url: string;
}
