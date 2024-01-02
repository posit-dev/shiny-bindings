import { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { makeOutputBinding } from "@posit-dev/shiny-bindings-core";

/**
 * Make a custom Shiny input binding using a react component.
 * @param name The name of the component.
 * @param selector The selector to use to find the element to bind to. Defaults to looking for
 * a class with the same name as the binding.
 * @param renderComp A function that renders the react component into the custom element
 * @returns A Shiny input binding
 */
export function makeReactOutput<T>({
  name,
  selector = `.${name}`,
  renderComp,
}: {
  name: string;
  selector?: string;
  renderComp: (payload: T) => ReactNode;
}) {
  makeOutputBinding<T>({
    name,
    selector,
    setup: (el) => {
      const root = createRoot(el);

      return {
        onNewValue: (payload) => {
          root.render(renderComp(payload));
        },
      };
    },
  });
}
