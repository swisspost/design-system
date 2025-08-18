import { Config } from 'style-dictionary/types';
export type CliOptions = {
  verbosity: 'silent' | 'default' | 'verbose';
  [key: string]: string;
};

export interface RawTokenJson {
  [setName: string]: any;
}
export type TokenProperty = string | number | boolean | { [key: string]: TokenProperty };

export interface TokenMeta {
  type: 'singleton' | 'collection';
  layer: 'core' | 'component' | 'semantic';
  filePath: string;
  setNames: string[];
  sets: {
    [setName: string]: { [key: string]: TokenProperty };
  };
}

export interface TokenDefinition {
  groupSlug: string;
  groupName: string | null;
  setName: string;
  baseDefinition: TokenMeta;
}

export interface ConfigWithMeta extends Config {
  meta?: TokenMeta;
}

export interface TokenSets {
  source: {
    meta: TokenMeta;
  };
  output: { [groupName: string]: TokenMeta };
}

export type TokenGroup = {
  [key: string]: TokenProperty | TokenGroup;
};

export type UtilityAttributes = {
  category: string;
  type: string;
  item: string;
  subitem: string;
  state: string;
};
