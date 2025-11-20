import { Environment } from './general.model';

export interface CoveoResponse {
  completions: CoveoCompletion[];
  responseId: string;
}

export interface CoveoCompletion {
  expression: string;
  score: number;
  highlighted: string;
  executableConfidence: number;
  objectId: string;
  redirectUrl?: string;
}

export interface CoveoOptions {
  url: string;
  environment: {
    [key in Environment]: {
      organisation: string;
      token: string;
    };
  };
}
