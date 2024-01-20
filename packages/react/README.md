# `@posit-dev/shiny-bindings-react`

This package contains helpers for creating custom input and output bindings using React components. Under the hood it encapsulates the react components in web copmponents and handles the communication between the two.

## Want to use plain webcomponents instead of React? See `@posit-dev/shiny-bindings-core`

## Installing

```bash
npm install @posit-dev/shiny-bindings-react
```

## Importing/Using

```typescript
import { makeReactInput } from "@posit-dev/shiny-bindings-react";
```

## Functions

### `makeReactInput()`

Convenience function for creating a custom input binding for a React component. Takes care of registering the input binding to Shiny.

Arguments:

- `name`: The name of the input binding to register with Shiny.
- `initialValue`: The initial value of the input.
- `renderComp`: A function that sets up the react component. Arguments:
  - `onNewValue`: A function that should be called whenever the value of the input binding changes. The value should be passed as the first argument to the function.
- `priority`: Should the value be immediately (`immediate`) updated wait to the next even loop (` "deferred"`)? Typically left at the default of "immediate".
- `selector` (Optional) A css selector for finding the element to render the input into in the UI. Defaults to selecting an element with the class of `name`. I.e. `.${name}`.

Example:

```typescript
makeReactInput<number>({
  name: "custom-react-input",
  initialValue: 0,
  renderComp: ({ initialValue, onNewValue }) => (
    <MyInput value={initialValue} onNewValue={onNewValue} />
  ),
});
```

### `makeReactOutput()`

Make a custom Shiny input binding using a react component. Takes care of registering the output binding to Shiny.

Arguments:

- `name`: The name of the output binding to register with Shiny.
- `renderComp`: Function to render the react component given a provided value. This function will be re-rendered every time the value of the output binding changes. Arguments:
  - `value`: The value of the output binding.
- `selector` (Optional) A css selector for finding the element to render the output into in the UI. Defaults to selecting an element with the class of `name`. I.e. `.${name}`.

```typescript
makeReactOutput<{ value: string }>({
  name: "custom-react-output",
  renderComp: ({ value }) => (
    <div>
      I am a react output with value: <strong>{value}</strong>
    </div>
  ),
});
```

## Webcomponent helpers

### `makeReactInput()`

Convenience function for creating a custom input binding for a React component. Takes care of registering the input binding to Shiny.

Arguments:

- `tagName`: The name of the custom element that will be used to render the React component.
- `initialValue`: The initial value of the input.
- `renderComp`: A function that setsup the react component.
- `priority`: Should the value be immediately (`immediate`) updated wait to the next even loop (` "deferred"`)? Typically left at the default of "immediate".

Example:

```typescript
// Generates a new input binding that renders the supplied react component
// into the root of the webcomponent.
makeReactInput({
  tagName: "react-demo",
  initialValue: "#fff",
  renderComp: ({ onNewValue }) => (
    <ColorPickerReact
      initialValue="#fff"
      onNewValue={(color) => onNewValue(color)}
    />
  ),
});
```

### `makeReactOutput()`

Make a custom Shiny input binding using a react component. Takes care of registering the output binding to Shiny. Encapsulates the React component in a webcomponent internally so the UI generation function just needs to be a return an HTMLTools `Tag` with the name of the custom element.

Arguments:

- `tagName`: The name of the custom element that will be used to render the React component.
- `renderComp`: A function that setsup the react component. Is a function that takes as an argument the payload sent over from the server. This is set by the user and can/should be typed to match the payload sent from the server on the TS side with the generic argument. Ex.

```typescript
makeReactOutput<{ value: number }>({
  tagName: "testing-output-comp",
  renderComp: ({ value }) => {
    return <div>My value is: {value}</div>;
  },
});
```

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
