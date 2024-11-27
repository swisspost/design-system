export interface IconReport {
  version: string;
  created: string;
  stats: {
    success: number;
    errors: number;
    notFound: number;
  };
  icons: Array<{
    file: {
      name: string;
      basename: string;
    };
  }>;
  wrongViewBox: Array<{
    file: {
      name: string;
      basename: string;
    };
  }>;
  noKeywords: Array<{
    file: {
      name: string;
      basename: string;
    };
  }>;
  errored: Array<{
    file: {
      name: string;
    };
    meta: {
      downloadLink: string;
    };
    errorMessage: string;
  }>;
  noSVG: Array<{
    file: {
      basename: string;
    };
  }>;
}
