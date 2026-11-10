/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PREVIEW_ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
