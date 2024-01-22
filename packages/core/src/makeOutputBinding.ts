import { Shiny } from "./utils";

/**
 * Callbacks that an element can use for rendering a custom output binding.
 * @template T The type of the data that will be passed to the element
 * @property onNewValue A function that will be called when there is new data
 * to render
 */
type BindingCallbacks<T> = {
  onNewValue: (x: T) => void;
};

/**
 * Setup a custom output binding
 *
 * @template T The type of the data that will be passed to the element
 * @param name The name of the binding. This will be used to register the binding with
 * Shiny. Must be unique.
 * @param selector The selector to use to find the element to bind to. Defaults to looking for
 * a class with the same name as the binding.
 * @param setup A function that will be called when the element is first bound. This
 * function should return an object with a function that will be called when
 * there is new data to render.
 *
 */
export function makeOutputBinding<T>({
  name,
  selector = `.${name}`,
  setup,
}: {
  /**
   * The name of the binding. This will be used to register the binding with
   * Shiny. Must be unique.
   */
  name: string;
  /**
   * The selector to use to find the element to bind to. Defaults to looking for
   * a class with the same name as the binding.
   */
  selector?: string;
  /**
   * A function that will be called when the element is first bound. This
   * function should return an object with a function that will be called when
   * there is new data to render.
   */
  setup: (el: HTMLElement) => BindingCallbacks<T>;
}) {
  if (!Shiny) {
    return;
  }

  class NewCustomBinding extends Shiny.OutputBinding {
    boundElements = new WeakMap<HTMLElement, BindingCallbacks<T>>();

    override find(scope: HTMLElement) {
      return $(scope).find(selector);
    }

    private getCallbacks(el: HTMLElement): BindingCallbacks<T> {
      // Get the callbacks for this element if they exist
      // If they don't exist, setup the element and get the callbacks

      if (!this.boundElements.has(el)) {
        this.boundElements.set(el, setup(el));
      }

      const callbacks = this.boundElements.get(el);
      if (typeof callbacks === "undefined") {
        throw new Error("Unable to get callbacks for element");
      }
      return callbacks;
    }

    override renderValue(el: HTMLElement, data: T): void {
      this.getCallbacks(el).onNewValue(data ?? {});
    }
  }

  Shiny.outputBindings.register(new NewCustomBinding(), `${name}-Binding`);
}
