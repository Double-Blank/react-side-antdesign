import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GAME_DIFFICULTY_CHOSE_SATE, GAME_INIT, GAME_START, GMAE_LEVEL } from './gameState';
import { Button, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

interface GameLevel {
  Up: number;
  Down: number;
  Speed: number;
}

export default function IntelligenceTest() {
  const initLevel = {
    Up: 1,
    Down: 9,
    Speed: 2000
  }
  const [gameState, setGameState] = useState(GAME_INIT)
  const [gameLevel, setGameLevel] = useState<GameLevel>(initLevel)
  
  // 定义 num state 用于保存计时的累积时间
  const [num, setNum] = useState<number>(0);
  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef<number | null>(0);

  // 开始计时的事件处理函数
  const handleStart = useCallback(() => {
    if (timer.current) {
      window.clearInterval(timer.current);
    }
    // 使用 current 属性设置 ref 的值
    timer.current = window.setInterval(() => {
      setNum((num) => num + 1);
    }, gameLevel.Speed);
  }, []);

  // 暂停计时的事件处理函数
  const handlePause = useCallback(() => {
    // 使用 clearInterval 来停止计时
    window.clearInterval(timer.current!);
    timer.current = null;
  }, []);

  const gameMainPage = () => {
    const min = gameLevel.Up;
    const max = gameLevel.Down
    const randomNum = () => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    const randomRes = randomNum()
    handleStart()
    return (
      <div>
        {JSON.stringify(gameLevel)}
        <div>{randomRes}</div>
      </div>
    )
  }

  const buttonShowContrller = (gameState: string) => {
    if (gameState === GAME_INIT) {
      return (
        <div>
          <Title level={4}>游戏名称: 记忆挑战</Title>

          <Paragraph>
            本游戏的目的是通过锻炼记忆力
          </Paragraph>

          <Title level={4}>游戏规则：</Title>

          <Paragraph>
            <blockquote>游戏开始后，屏幕上会随机显示一组数字</blockquote>
          </Paragraph>

          <Paragraph>
            <blockquote>玩家需要专注观察并记住屏幕上显示的数字</blockquote>
          </Paragraph>

          <Paragraph>
            <blockquote>在数字消失后，玩家需要回答并书写出刚刚显示的数字的后四个</blockquote>
          </Paragraph>

          <Paragraph>
            按<Text keyboard>⬇️</Text>开始游戏……
          </Paragraph>
          <Button type="primary" onClick={() => {
            setGameState(GAME_DIFFICULTY_CHOSE_SATE)
          }}>开始锻炼智力</Button>
        </div>
      )
    }
    if (gameState === GAME_DIFFICULTY_CHOSE_SATE) {
      return (
        <Button type="primary" onClick={() => {
          setGameState(GAME_START)
          setGameLevel(GMAE_LEVEL[0])
        }}>关卡1</Button>
      )
    }
    if (gameState === GAME_START) {
      return gameMainPage()
    }
  }

  return (
    <div>
      {buttonShowContrller(gameState)}
    </div>
  );
}