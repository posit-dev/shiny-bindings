import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

import {
  makeInputBinding,
  makeOutputBinding,
  makeOutputBindingWebComponent,
} from "@posit-dev/shiny-bindings-core";

// What the server-side output binding will send to the client. It's important
// to make sure this matches what the python code is sending.
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
      <span part="display"> Value: ${this.count} </span>
      <slot></slot>
    `;
  }
}

// Setup output binding. This also registers the custom element.
makeOutputBindingWebComponent<Payload>("custom-component", CustomComponentEl);

makeOutputBinding<Payload>({
  name: "custom-component-simple",
  setup: (el) => {
    let rendered_count = 0;

    return {
      onNewValue: (payload) => {
        el.innerHTML = `
        <span part="display"> Simple value: ${payload.value} </span>
        <span> Rendered ${++rendered_count} times </span>
      `;
      },
    };
  },
});

makeInputBinding<number>({
  name: "custom-component-input",
  setup: (el, onNewValue) => {
    let count = 0;
    el.innerHTML = `
    <span>I am an input</span>
    <button>Click me</button>
    `;
    const button = el.querySelector("button")!;
    button.addEventListener("click", () => {
      onNewValue(++count);
    });
    onNewValue(count);
  },
});
