/**
 * A safe Shiny object that reflects we may be in an environment without Shiny
 * e.g. a static quarto document.
 *
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Shiny: typeof window.Shiny | undefined = window.Shiny;

/**
 * Helper for typing a custom component constructor so class definitions for
 * custom elements can be passed to functions without crazy type signatures.
 */
export type Constructor<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
};
