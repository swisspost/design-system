export function timeout(delay: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay));
}
