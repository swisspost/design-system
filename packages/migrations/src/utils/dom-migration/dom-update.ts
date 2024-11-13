import { Cheerio, CheerioAPI } from 'cheerio';

export interface DomUpdate {
  selector: string;
  update: ($elements: Cheerio<unknown>, $: CheerioAPI) => void;
}
