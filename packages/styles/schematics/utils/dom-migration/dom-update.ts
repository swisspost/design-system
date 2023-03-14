import { Cheerio, CheerioAPI } from 'cheerio';

export interface DomUpdate {
  selector: string;
  update: ($elements: Cheerio<any>, $: CheerioAPI) => void;
}
