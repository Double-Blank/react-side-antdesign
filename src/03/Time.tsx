import { useState, useRef, useEffect } from "react";

export default function Timer2() {
  // 定义 time state 用于保存计时的累积时间
  const [time, setTime] = useState(0);

  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef<number>();

  const [state, setState] = useState(true);

  // useEffect
  useEffect(() => {
    if (timer.current) {
      window.clearInterval(timer.current);
    }
    // 使用 current 属性设置 ref 的值
    timer.current = window.setInterval(() => {
      // setState(!state);
      setTime((time) => time + 1);
    }, 100);
  }, [state]);

  return (
    <div>
      {JSON.stringify(state)}
      <br></br>
      {time / 10} seconds.
      <br></br>
      <button onClick={() => {
        setState(!state);
      }}>
        改变状态
      </button>
    </div>
  );
}