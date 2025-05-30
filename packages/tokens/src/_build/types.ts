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

type TokenValue = string | number | boolean | { [key: string]: TokenValue } | Array<TokenValue>;

export type TokenProperty =
  | string
  | number
  | boolean
  | { [key: string]: TokenProperty }
  | {
      // Token definition object
      $type?: string;
      $value: TokenValue; // Use the refined TokenValue type
      $description?: string;
      $extensions?: { [key: string]: TokenValue }; // Assume extensions also follow TokenValue structure
    };

export interface TokenSetEntry {
  type: 'singleton' | 'collection';
  layer: 'core' | 'component' | 'semantic';
  filePath: string;
  sets: {
    [setName: string]: any; // To be refined after
  };
}

export interface ProcessedTokenSetsOutput {
  [groupName: string]: TokenSetEntry;
}

export interface TokenSets {
  source: {
    [setName: string]: { [key: string]: TokenProperty };
  };
  output: ProcessedTokenSetsOutput;
}
