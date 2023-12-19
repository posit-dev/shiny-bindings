import {
  makeReactInput,
  makeReactOutput,
} from "@posit-dev/shiny-bindings-react";
import React from "react";

type Payload = { value: number };

makeReactOutput<Payload>({
  name: "custom-react-output",
  renderComp: ({ value }) => (
    <div
      style={{
        border: "1px solid black",
        padding: "1rem",
      }}
    >
      I'm a react output with value <strong>{value}</strong>
    </div>
  ),
});

makeReactInput<number>({
  name: "custom-react-input",
  initialValue: 0,
  renderComp: ({ initialValue, onNewValue }) => (
    <MyInput value={initialValue} onNewValue={onNewValue} />
  ),
});

function MyInput({
  value,
  onNewValue,
}: {
  value: number;
  onNewValue: (val: number) => void;
}) {
  const [val, setVal] = React.useState(value);

  return (
    <>
      <button
        onClick={(e) => {
          const newVal = val + 1;
          setVal(newVal);
          onNewValue(newVal);
        }}
      >
        React
      </button>
    </>
  );
}
