import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";

import {
  CustomElementInput,
  makeInputBindingWebComponent,
  makeOutputBindingWebComponent,
} from "@posit-dev/shiny-bindings-core";

type Payload = { value: number };
/**
 * An example element.
 *
 * @csspart display - The span containing the value
 */
export class CustomComponentEl extends LitElement {
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
    }
  `;

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  onNewValue(payload: Payload) {
    this.count = payload.value;
  }

  override render() {
    return html`
      <span>I am a webcomponent output with value:</span>
      <strong part="display">${this.count} </strong>
      <slot></slot>
    `;
  }
}

// Setup output binding. This also registers the custom element.
makeOutputBindingWebComponent<Payload>(
  "webcomponent-output",
  CustomComponentEl
);

/**
 * An example element.
 *
 * @csspart button - The button that increments the value
 * @csspart display - The span containing the value
 */
export class CustomInputEl
  extends LitElement
  implements CustomElementInput<number>
{
  static override styles = css`
    :host {
      display: block;
      border: solid 1px gray;
      padding: 16px;
      max-width: 800px;
      width: fit-content;
    }
  `;

  @property({ type: Number })
  value = 0;

  /*
   * The callback function that is called when the value of the input changes.
   * This alerts Shiny that the value has changed and it should check for the
   * latest value. This is set by the input binding.
   */
  notifyBindingOfChange: (x?: boolean) => void = () => {};

  /**
   * Function to run when the increment button is clicked.
   */
  onIncrement() {
    this.value++;
    this.notifyBindingOfChange(true);
  }

  override render() {
    return html`
      <button @click=${this.onIncrement} part="button">Web Component</button>
      <slot></slot>
    `;
  }
}

// Setup the input binding
makeInputBindingWebComponent("webcomponent-input", CustomInputEl, {
  registerElement: true,
});
