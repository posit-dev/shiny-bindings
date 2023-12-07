import {
  CustomElementInput,
  makeInputBinding,
} from "@posit-dev/shiny-bindings-core";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

/**
 * Make a custom Shiny input binding using a react component.
 * @param tagName The name of the custom element to create
 * @param initialValue The initial value of the input
 * @param renderComp A function that renders the react component into the custom element
 * @param priority Should the value be immediately updated wait to the next even loop? Typically set at "immediate."
 * @returns A Shiny input binding
 */
export function makeReactInput<T>({
  tagName,
  initialValue,
  renderComp,
  priority = "immediate",
}: {
  tagName: string;
  initialValue: T;
  renderComp: ({
    initialValue,
    onNewValue,
  }: {
    initialValue: T;
    onNewValue: (x: T) => void;
  }) => ReactNode;
  priority?: "immediate" | "deferred";
}) {
  class InputComponent extends HTMLElement implements CustomElementInput<T> {
    /**
     * The current value of the input.
     */
    value: T = initialValue;

    notifyBindingOfChange: (allowDeferred?: boolean) => void = () => null;

    /**
     * Function to run when the a new color is shown. First updates the value and
     * then tells Shiny that there is an updated value
     */
    onNewValue(x: T) {
      this.value = x;
      this.notifyBindingOfChange(priority === "deferred");
    }

    connectedCallback() {
      // Render the react component into the root
      // Note the use of arrow functions. This makes sure the `this` stays the
      // webcomponent and doesn't get bound away by react.
      createRoot(this).render(
        renderComp({
          initialValue: initialValue,
          onNewValue: (x) => this.onNewValue(x),
        })
      );
    }
  }

  // Register the custom element
  customElements.define(tagName, InputComponent);

  // Setup the input binding for the custom input
  makeInputBinding<InputComponent>(tagName);
}
