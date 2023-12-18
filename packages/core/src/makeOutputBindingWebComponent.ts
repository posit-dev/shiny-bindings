import { Constructor } from "./utils";
import { Shiny } from "./utils";
import { CustomElementOutput } from "./makeOutputBinding";

/**
 * Given a tag name for a custom element that extends CustomElementOutput<T>,
 * this will hook up the proper output binding and register it with Shiny.
 * @param tagName Name of the tag that corresponds to the output binding
 * @param el The custom element that extends CustomElementOutput<T>
 * @param opts Options for the output binding
 * @param opts.registerElement Whether to register the webcomponent used for the
 * output. Defaults to true.
 */

export function makeOutputBindingWebComponent<
  T,
  El extends CustomElementOutput<T> = CustomElementOutput<T>
>(
  tagName: string,
  el: Constructor<El>,
  opts: {
    registerElement?: boolean;
  } = { registerElement: true }
) {
  if (!Shiny) {
    return;
  }

  class NewCustomBinding extends Shiny["OutputBinding"] {
    override find(scope: HTMLElement): JQuery<El> {
      return $(scope).find(tagName) as JQuery<El>;
    }

    override renderValue(el: El, data: T): void {
      el.onNewValue(data);
    }
  }

  if (opts.registerElement) {
    customElements.define(tagName, el);
  }

  Shiny.outputBindings.register(new NewCustomBinding(), `${tagName}-Binding`);
}