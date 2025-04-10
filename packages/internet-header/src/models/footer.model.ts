export interface IFooterConfig {
  title: string;
  asWebComponent: boolean;
  osLinks?: { serviceName: string; links: LinksEntity[] }; // type?
  block: BlockEntity[];
  entry: {
    text: string;
  };
  links: LinksEntity[];
  classes: string[];
  additionalAttributes: string[]; // string?
}

export interface BlockEntity {
  columnType: string;
  title: string;
  links?: LinksEntity[];
  content?: ContentEntity[];
}

export interface LinksEntity {
  url: string;
  target: string;
  text?: string;
  title?: string;
  name?: string;
  icon?: string;
  classes: string[];
  additionalAttributes: unknown[]; // {[key:string]:string}?
}

export interface ContentEntity {
  address: string;
  describe: string;
  hours: string;
  links: LinksEntity[];
  name: string;
  number: string;
  text: string;
  title: string;
}

export interface ICustomFooterConfig {
  block: CustomBlockEntity;
}

export interface CustomBlockEntity {
  title: string;
  links?: LinksEntity[];
}
