import { useState } from "react";

const Display = ({ value }) => {
  return <div>{value}</div>;
};

const Button = (props) => {
  return <button onClick={props.handleclick}>{props.text}</button>;
};

const App = () => {
  const [value, setValue] = useState(10);

  const setToValue = (newValue) => {
    console.log("value now..", newValue);
    setValue(newValue);
  };

  return (
    <>
      <Display value={value} />
      <Button handleclick={() => setToValue(1000)} text="thousand" />
      <Button handleclick={() => setToValue(0)} text="reset" />
      <Button handleclick={() => setToValue(value + 1)} text="increment" />
    </>
  );
};

export default App;
