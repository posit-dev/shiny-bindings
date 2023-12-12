import { Shiny } from "./utils";
import { Constructor } from "./utils";

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
 * @param el The custom element that extends `CustomElementInput<T>`.
 * @param opts Options for the output binding
 * @param opts.registerElement Whether to register the webcomponent used for the
 * output. Defaults to true.
 * @param opts.type The type of the input. This is used for type-checking the
 * input within Shiny. Defaults to null.
 */
export function makeInputBinding<
  T,
  El extends CustomElementInput<T> = CustomElementInput<T>
>(
  tagName: string,
  el: Constructor<El>,
  opts: {
    registerElement?: boolean;
    type?: string | null;
  } = { registerElement: true, type: null }
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
      return opts.type ?? null;
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

  if (opts.registerElement) {
    customElements.define(tagName, el);
  }

  Shiny.inputBindings.register(new NewCustomBinding(), `${tagName}-Binding`);
}
