This repo is an example of a python package that utilizes the helper functions in the `@posit-dev/shiny-bindings-core` and `@posit-dev/shiny-bindings-react` packages.

## Developing using this package

In the `packages/core` folder:

```bash
npm run watch
```

In the `example-app` folder:

```bash
npm install-pkg

npm run watch
```

Run app in `example-app` folder with the vscode extension play button.

Changes to the core package will be automatically picked up by the example app and reloaded.
