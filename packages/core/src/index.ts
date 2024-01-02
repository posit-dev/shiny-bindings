export type { CustomElementInput } from "./makeInputBindingWebComponent";
export { makeInputBindingWebComponent } from "./makeInputBindingWebComponent";
export { makeInputBinding } from "./makeInputBinding";
export { makeOutputBinding } from "./makeOutputBinding";
export type { CustomElementOutput } from "./makeOutputBindingWebComponent";
export { makeOutputBindingWebComponent } from "./makeOutputBindingWebComponent";
// type Shiny = typeof window.Shiny | undefined;
// export type { Shiny };

// Add export of Shiny so people can use it in their own code
/// <reference types="@types/rstudio-shiny" />
