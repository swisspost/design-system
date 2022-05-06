export function oneOf(list: string[]): string {
    return `(${list.join('|')})`;
}

export function optional(expr: string): string {
    return `(?:${expr})?`;
}
