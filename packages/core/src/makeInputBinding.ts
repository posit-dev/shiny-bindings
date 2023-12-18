import { Shiny } from "./utils";

/**
 * Make a custom input binding
 *
 * @param name The name of the binding. This will be used to register the binding with
 * Shiny. Must be unique.
 * @param selector The selector to use to find the element to bind to. Defaults to looking for
 * a class with the same name as the binding.
 * @param setup A function that will be called when the element is first bound. Arguments are
 * the element to bind to and a function that should be called by the input binding when there
 * is a new value.
 *
 */
export function makeInputBinding<T>({
  name,
  selector = `.${name}`,
  setup,
}: {
  name: string;
  selector?: string;
  setup: (
    el: HTMLElement,
    onNewValue: (x: T, allowDeferred?: boolean) => void
  ) => void;
}) {
  if (!Shiny) {
    return;
  }

  class NewCustomBinding extends Shiny.InputBinding {
    boundElementValues = new WeakMap<HTMLElement, T>();

    constructor() {
      super();
    }

    override find(scope: HTMLElement) {
      return $(scope).find(selector);
    }

    override getValue(el: HTMLElement) {
      if (this.boundElementValues.has(el)) {
        return this.boundElementValues.get(el);
      }

      return null;
    }

    // TODO: Setup the getType method here

    override subscribe(
      el: HTMLElement,
      callback: (allowDeferred: boolean) => void
    ): void {
      // Make sure this is only called once per element
      if (this.boundElementValues.has(el)) {
        throw new Error(
          "Cannot subscribe to an element that is already subscribed to"
        );
      }

      setup(el, (x, allowDeferred = false) => {
        this.boundElementValues.set(el, x);
        callback(allowDeferred);
      });
    }

    override unsubscribe(el: HTMLElement): void {
      this.boundElementValues.delete(el);
    }
  }

  Shiny.inputBindings.register(new NewCustomBinding(), `${name}-Binding`);
}
