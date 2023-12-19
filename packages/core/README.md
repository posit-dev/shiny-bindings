# `@posit-dev/shiny-bindings-core`

This is package contains helpers for setting up input and output bindings for Shiny apps. It assumes that Web Components will be the method of choice for creating custom input and output bindings.

## Want to use React instead of webcomponents? See `@posit-dev/shiny-bindings-react`

## Installing

```bash
npm install @posit-dev/shiny-bindings-core
```

## Importing/Using

```typescript
import { makeInputBinding } from "@posit-dev/shiny-bindings-core";
```

## Functions

### `makeInputBinding()`

Function for creating and registering a custom input binding with Shiny.

Takes an object with the following properties:

- `name`: The name of the input binding to register with Shiny.
- `setup`: A function that takes an `HTMLElement` and a callback function. The function should setup the input binding and call the callback function with the initial value of the input binding. The callback function should be called whenever the input binding value changes.
- `selector` (Optional) A css selector for finding the element to render the input into in the UI. Defaults to selecting an element with the class of `name`. I.e. `.${name}`.

```typescript
makeInputBinding<number>({
  name: "custom-component-input",
  setup: (el, onNewValue) => {
    let count = 0;
    el.innerHTML = `<button>Plain</button>`;
    const button = el.querySelector("button")!;
    button.addEventListener("click", () => {
      onNewValue(++count);
    });
    onNewValue(count);
  },
});
```

### `makeOutputBinding()`

A function for creating and registering a custom output binding with Shiny.

Takes an object with the following properties:

- `name`: The name of the output binding to register with Shiny.
- `setup`: A function that takes an `HTMLElement` and returns an object with a `onNewValue` function. The function should setup the output binding and return an object with a `onNewValue` function. The `onNewValue` function will be called whenever the output binding value changes.
- `selector` (Optional) A css selector for finding the element to render the output into in the UI. Defaults to selecting an element with the class of `name`. I.e. `.${name}`.

```typescript
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
```

## Webcomponent Helpers

### `makeInputBindingWebComponent()`

Function for creating a custom input binding given a tag name for a custom element (following the `CustomElementInput` interface.) Function takes care of registering input binding to ShinyCustomElementInput.

### `makeOutputBindingWebComponent()`

Function for creating a custom output binding given a tag name for a custom element (following the `CustomElementOutput` interface.) Function takes care of registering output binding to Shiny.

### `CustomElementInput`

Typescript interface for the `input` element. Extends the default `HTMLElement` to include the `value` property for holding the input value, and a `notifyBindingOfChange()` method for notifying Shiny of a change in the input value.

### `CustomElementOutput`

Typescript interface for the `output` element. Extends the default `HTMLElement` to include the `value` property for holding the output value.

An element that implements this interface should watch for changes in the `value` property and update the rending accordingly.

## Development

To build the package locally run

```bash
npm run build
```

This runs `tsc` and generates the production code in the `dist` folder.

## Deploying

To deploy this package to NPM simply run

```bash
npm publish
```

This will auto build the project and publish it to NPM. Make sure to update the version number in `package.json` before publishing.
