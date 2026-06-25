export interface IconMigrationJson {
  iconMap: {
    old: number;
    new: string | string[];
  }[];
}
