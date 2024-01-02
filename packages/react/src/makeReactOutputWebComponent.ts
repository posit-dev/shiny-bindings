import { ReactNode } from "react";
import { createRoot } from "react-dom/client";

/**
 * Make a custom Shiny input binding using a react component.
 *
 * This function works by rendering the react component into a webcomponent with the
 * a given tag name. The benefits of this over plain `makeReactOutput` is that
 * shadow DOM is used to isolate the component from the rest of the page. This means the
 * styles of the component can be completely isolated from external css.
 *
 * @param tagName The name of the custom element to create
 * @param renderComp A function that renders the react component into the custom element
 * @returns A Shiny input binding
 */

export function makeReactOutputWebComponent<T>({
  tagName,
  renderComp,
}: {
  tagName: string;
  renderComp: (payload: T) => ReactNode;
}) {
  class OutputComponent extends HTMLElement {
    /**
     * Function to run when the a new color is shown. First updates the value and
     * then tells Shiny that there is an updated value
     */
    onNewValue(x: T) {
      createRoot(this).render(renderComp(x));
    }
  }

  class CustomOutputBinding extends Shiny.OutputBinding {
    /**
     * Find the element that will be rendered by this output binding.
     * @param scope The scope in which to search for the element.
     * @returns The element that will be rendered by this output
     * binding.
     */
    override find(scope: JQuery<HTMLElement>) {
      return scope.find(tagName);
    }

    /**
     * Function to run when rendering the output. This function will be passed the
     * element that was found by `find()` and the payload that was sent by the
     * server when there's new data to render. Note that the element passed may
     * already be populated with content from a previous render and it is up to
     * the function to clear the element and re-render the content.
     * @param el The element that was found by `find()`
     * @param payload An object as provided from server with the
     * `render_testing_output_comp` function
     */
    override renderValue(el: HTMLElement, payload: T) {
      // Return early if el is not an instance of the custom element
      if (!(el instanceof OutputComponent)) {
        return;
      }

      el.onNewValue(payload);
    }
  }

  // Register the custom element and output binding
  customElements.define(tagName, OutputComponent);
  Shiny.outputBindings.register(new CustomOutputBinding(), tagName);
}
