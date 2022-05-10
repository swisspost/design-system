export class CssClassesUpdate {
    searcher: RegExp;
    replacer: (substring: string, ...args: any[]) => string;

    constructor(searchValue: string, replacer: (...params: any) => string);
    constructor(searchValue: string, replaceValue: string);
    constructor(searchValue: string, replaceValue: any) {
        this.searcher = new RegExp(`^${searchValue}$`);

        if (typeof replaceValue === "string") {
            this.replacer = () => replaceValue;
        } else {
            this.replacer = (_substring: string, ...args: any[]) => replaceValue(...args);
        }
    }
}
