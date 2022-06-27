type Replacer = ((...params: any) => string);

export abstract class CssClassesUpdate {
    selector: string;
    abstract searchValue: string;
    abstract replaceValue: string | Replacer;

    get searcher(): RegExp {
        return new RegExp(`^${this.searchValue}$`);
    }

    get replacer(): (substring: string, ...args: any[]) => string {
        if (typeof this.replaceValue === "string") {
            return () => (<string>this.replaceValue);
        } else {
            return (_substring: string, ...args: any[]) => (<Replacer>this.replaceValue)(...args);
        }
    }
}
