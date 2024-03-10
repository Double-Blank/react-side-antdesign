import React from "react";

export default function Counter() {
  const [count, setCount] = React.useState(0);
  // const theme = useContext(ThemeContext);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        {count}
      </button>
    </div>
  );
}