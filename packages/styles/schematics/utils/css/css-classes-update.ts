type Replacer = ((...params: any) => string);

export abstract class CssClassesUpdate {
    tagSelector: string;
    classSelector: string;
    attributeSelector: string;
    abstract searchValue: string;
    abstract replaceValue: string | Replacer;

    get tag(): RegExp | null {
        return this.tagSelector ? new RegExp(`^${this.tagSelector}$`) : null;
    }

    get class(): RegExp | null {
        return this.classSelector ? new RegExp(`^${this.classSelector}$`) : null;
    }

    get attribute(): RegExp | null {
        return this.attributeSelector ? new RegExp(`^${this.attributeSelector}$`) : null;
    }

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
