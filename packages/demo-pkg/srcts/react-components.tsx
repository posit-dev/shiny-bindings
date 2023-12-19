import { makeReactOutput } from "@posit-dev/shiny-bindings-react";
import React from "react";

makeReactOutput<{ value: string }>({
  name: "custom-react-output",
  renderComp: ({ value }) => (
    <div
      style={{
        border: "1px solid black",
        height: "100px",
        width: "100px",
      }}
    >
      I'm a react output with value {value}
    </div>
  ),
});
