import {
  makeInputBinding,
  makeOutputBinding,
} from "@posit-dev/shiny-bindings-core";

// What the server-side output binding will send to the client. It's important
// to make sure this matches what the python code is sending.

makeOutputBinding<{ value: number }>({
  name: "custom-component-simple",
  setup: (el) => {
    return {
      onNewValue: (payload) => {
        el.innerHTML = `
          <span>I am a plain output with value:</span>
          <strong> ${payload.value} </strong>
        `;
      },
    };
  },
});

makeInputBinding<number>({
  name: "custom-component-input",
  setup: (el, updateValue) => {
    let count = 0;
    el.innerHTML = `
      <button>Plain</button>
      `;
    const button = el.querySelector("button")!;
    button.addEventListener("click", () => {
      updateValue(++count);
    });
    updateValue(count);
  },
});
