declare module '*.json' {
  const value: unknown;
  export default value;
}

declare module '@/shared/icons-migration-map.json' {
  const value: {
    icons: {
      old: number;
      new: string | string[];
    }[];
  };

  export default value;
}
