export type CliOptions = {
  verbosity: 'silent' | 'default' | 'verbose';
  [key: string]: string;
};

export interface RawTokenJson {
  [setName: string]: any;
}

export interface TokenDefinition {
  groupSlug: string;
  groupName: string | null;
  setName: string;
  baseDefinition: {
    type: 'singleton' | 'collection';
    layer: 'core' | 'component' | 'semantic';
    filePath: string;
  };
}

export interface ProcessedTokenSetsOutput {
  [groupName: string]: TokenSetEntry;
}

export interface TokenSetEntry {
  type: 'singleton' | 'collection';
  layer: 'core' | 'component' | 'semantic';
  filePath: string;
  sets: {
    [setName: string]: any; // We'll refine the type of the token set object later
  };
}
