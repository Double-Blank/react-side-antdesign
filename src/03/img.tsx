import React from "react";
import img from './img/3472780159.jpg'

export default function ImgTest() {
  const [count, setCount] = React.useState(0);
  // const theme = useContext(ThemeContext);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        {count}
        <img src={img} alt="" />
      </button>
    </div>
  );
}