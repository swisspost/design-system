type Replacer = ((...params: any) => string);

export abstract class CssClassesUpdate {
    tagSelector: string;
    classSelector: string;
    attributeSelector: string;
    abstract searchValue: string;
    abstract replaceValue: string | Replacer;

    get tag(): RegExp {
        return new RegExp(`^${this.tagSelector}$`);
    }

    get class(): RegExp {
        return new RegExp(`^${this.classSelector}$`);
    }

    get attribute(): RegExp {
        return new RegExp(`^${this.attributeSelector}$`);
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
