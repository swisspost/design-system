import { shouldReduceMotion } from './should-reduce-motion';

export async function onTransitionEnd(el: HTMLElement): Promise<void> {
  return new Promise(resolve => {
    if (shouldReduceMotion()) {
      resolve();
    } else {
      el.ontransitionend = () => {
        resolve();
        el.ontransitionend = null;
      };
    }
  });
}
