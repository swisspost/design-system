/*
 * Copyright 2022 by Swiss Post, Information Technology
 */

export function shouldReduceMotion(): boolean {
  return window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
}
