import {
  makeInputBinding,
  makeOutputBinding,
} from "@posit-dev/shiny-bindings-core";

// What the server-side output binding will send to the client. It's important
// to make sure this matches what the python code is sending.

makeOutputBinding<{ value: number }>({
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
