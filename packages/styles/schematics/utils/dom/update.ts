import { Cheerio, CheerioAPI } from 'cheerio';

export default interface DomUpdate {
    selector: string;
    update: ($elements: Cheerio<any>, $: CheerioAPI) => void;
}
