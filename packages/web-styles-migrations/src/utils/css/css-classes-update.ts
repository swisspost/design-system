export class CssClassesUpdate {
    searcher: RegExp;
    replacer: (substring: string, ...args: any[]) => string;

    constructor(searchValue: string, replacer: (...params: any) => string) {
        this.searcher = new RegExp(`^${searchValue}$`);
        this.replacer = (_substring: string, ...args: any[]) => replacer(...args);
    }
}
