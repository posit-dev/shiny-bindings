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

### `CustomElementInput`

Typescript interface for the `input` element. Extends the default `HTMLElement` to include the `value` property for holding the input value, and a `notifyBindingOfChange()` method for notifying Shiny of a change in the input value.

### `makeInputBinding()`

Function for creating a custom input binding given a tag name for a custom element (following the `CustomElementInput` interface.) Function takes care of registering input binding to ShinyCustomElementInput.

### `CustomElementOutput`

Typescript interface for the `output` element. Extends the default `HTMLElement` to include the `value` property for holding the output value.

An element that implements this interface should watch for changes in the `value` property and update the rending accordingly.

### `makeOutputBinding()`

Function for creating a custom output binding given a tag name for a custom element (following the `CustomElementOutput` interface.) Function takes care of registering output binding to Shiny.

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
