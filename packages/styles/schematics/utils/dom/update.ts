import { Cheerio, CheerioAPI } from 'cheerio';

export default interface IDomUpdate {
    selector: string;
    update: ($elements: Cheerio<any>, $: CheerioAPI) => void;
}
