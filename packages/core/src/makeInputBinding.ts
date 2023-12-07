import { Shiny } from "./OptionalShiny";

/**
 * A custom element that extends this interface will be treated as an input
 * binding by Shiny when paired with `makeInputBinding()`.
 */
export interface CustomElementInput<T = string> extends HTMLElement {
  id: string;
  value: T;
  /**
   * Function to let Shiny know it should look for a new value.
   * @param allowDeferred Should the value be immediately updated wait to the next event loop?
   */
  notifyBindingOfChange: (allowDeferred?: boolean) => void;
}

/**
 * Given a tag name for a custom element that is a CustomElementInput<T>, this
 * will hook up the proper input binding and register it with Shiny.
 * @param tagName Name of the tag that corresponds to the input binding
 * @param elementComponent The component that will be used to render the input.
 * This is used for type-checking the input.
 * @returns Nothing
 */
export function makeInputBinding<El extends CustomElementInput<unknown>>(
  tagName: string,
  { type = null }: { type?: string | null } = {}
) {
  if (!Shiny) {
    return;
  }

  class NewCustomBinding extends Shiny["InputBinding"] {
    constructor() {
      super();
    }

    override find(scope: HTMLElement): JQuery<El> {
      return $(scope).find(tagName) as JQuery<El>;
    }

    override getValue(el: El) {
      return el.value;
    }

    override getType(_: El): string | null {
      return type;
    }

    override subscribe(
      el: El,
      callback: (allowDeferred: boolean) => void
    ): void {
      // This is so that we can appease shiny's callback type which says that the
      // allowDefered parameter is always required. Our implementation doesn't
      // need it to be passed, which is the equivalent of passing false.
      el.notifyBindingOfChange = (ad?: boolean) => callback(ad ?? false);
    }

    override unsubscribe(el: El): void {
      el.notifyBindingOfChange = (_?: boolean) => {};
    }
  }

  Shiny.inputBindings.register(new NewCustomBinding(), `${tagName}-Binding`);
}
