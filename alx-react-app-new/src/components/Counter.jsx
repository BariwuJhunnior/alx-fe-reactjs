import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  function Increment() {
    setCount((prev) => {
      prev + 1;
    });
  }

  function Decrement() {
    setCount((prev) => prev - 1);
  }

  return (
    <>
      <p>Current Count: {count}</p>
      <button onClick={Increment}>Increase</button>
      <button onClick={Decrement}>Decrease</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  );
}

export default Counter;
