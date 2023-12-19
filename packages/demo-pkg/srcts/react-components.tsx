import {
  makeReactInput,
  makeReactOutput,
} from "@posit-dev/shiny-bindings-react";
import React from "react";

type Payload = { value: string };

makeReactOutput<Payload>({
  name: "custom-react-output",
  renderComp: ({ value }) => (
    <div
      style={{
        border: "1px solid black",
        height: "100px",
      }}
    >
      I'm a react output with value <strong>{value}</strong>
    </div>
  ),
});

makeReactInput<string>({
  name: "custom-react-input",
  initialValue: "initial value",
  renderComp: ({ initialValue, onNewValue }) => (
    <MyInput value={initialValue} onNewValue={onNewValue} />
  ),
});

function MyInput({
  value,
  onNewValue,
}: {
  value: string;
  onNewValue: (val: string) => void;
}) {
  const [val, setVal] = React.useState(value);

  return (
    <input
      type="text"
      value={val}
      onChange={(e) => {
        setVal(e.target.value);
        onNewValue(e.target.value);
      }}
    />
  );
}
