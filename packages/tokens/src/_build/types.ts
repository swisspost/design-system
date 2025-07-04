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

export interface TokenSets {
  source: {
    baseDefinition: TokenMeta;
    sets: {
      [setName: string]: { [key: string]: TokenProperty };
    };
  };
  output: { [groupName: string]: TokenMeta };
}

export type TokenGroup = {
  [key: string]: TokenProperty | TokenGroup;
};
