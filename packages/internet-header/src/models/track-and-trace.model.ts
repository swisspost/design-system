export interface TrackAndTraceInfo {
  ok: boolean | string;
  timestamp: string;
  sending?: {
    'id': string;
    'product': string;
    'state': string;
    'state-id': number;
    'recipient': {
      zipcode: string;
      city: string;
    };
  };
  events?: [
    {
      date: string;
      time: string;
      number: string;
      description: string;
      zip: string;
      city: string;
      coords: [number, number];
    },
  ];
}
