export function oneOf(list: Iterable<string>): string {
    return `(${Array.from(list).join('|')})`;
}

export function optional(expr: string): string {
    return `(?:${expr})?`;
}
