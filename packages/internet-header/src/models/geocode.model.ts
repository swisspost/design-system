export interface GeocodeResponse {
  ok: boolean;
  info: string;
  time: string;
  note: string;
  count: number;
  locations: GeocodeLocation[];
}

export interface GeocodeLocation {
  id?: string;
  name: string;
  type: string;
  subtype?: string;
  pt: [number, number];
  bbox: [number, number, number, number];
}

export const GeocodeResponseType = {
  Region: 'region',
  City: 'city',
  Zip: 'zip',
  Locality: 'locality',
  Address: 'address',
  Poi: 'poi',
} as const;
export type GeocodeResponseType = (typeof GeocodeResponseType)[keyof typeof GeocodeResponseType];

export interface ServiceTypesResponse {
  ok: boolean;
  info: string;
  time: string;
  opentmin: string;
  opentmax: string;
  flags: { [key: string]: string };
  count: number;
  types: ServiceType[];
}

export interface ServiceType {
  tag: string;
  count: number;
  cat: string;
  id: string;
  desc: string;
  rectype?: string;
  group?: string;
  groupSortKey?: number;
  itemSortKey?: number;
  list?: boolean;
  priv?: boolean;
  biz?: boolean;
  url?: string;
  urlMobile?: string;
}
