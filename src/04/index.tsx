import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GAME_DIFFICULTY_CHOSE_SATE, GAME_END, GAME_INIT, GAME_START, GMAE_LEVEL, Level_1 } from './gameState';
import { Button, Typography } from 'antd';
const { Title, Paragraph, Text } = Typography;

interface GameLevel {
  Up: number;
  Down: number;
  Speed: number;
}

export default function IntelligenceTest() {
  const initLevel = Level_1
  const [gameState, setGameState] = useState(GAME_INIT)
  const [gameLevel, setGameLevel] = useState<GameLevel>(initLevel)
  const [gameGlobalRandmonNumber, setGameGlobalRandomNumber] = useState(-1)
  const [randomNum , setRandomNum] = useState(-1)
  const [arr, setArr] = useState<number[]>([])
  
  // 定义 timer 这样一个容器用于在跨组件渲染之间保存一个变量
  const timer = useRef<number | null>(0);

  const randomNumFunc = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // 暂停计时的事件处理函数
  const handlePause = useCallback(() => {
    // 使用 clearInterval 来停止计时
    window.clearInterval(timer.current!);
    timer.current = null;
  }, []);

  const gameMain = () => {
    const min = gameLevel.Up;
    const max = gameLevel.Down
    const randomRes = randomNumFunc(min, max)
    setRandomNum(randomRes);
    console.log('randomRes', randomRes)
    const arrTemp = JSON.parse(JSON.stringify(arr))
    arrTemp.push(randomRes)
    setArr(arrTemp)
  }

  // 开始计时的事件处理函数
  const handleStart = useCallback(() => {
    // gameMain()
    if (timer.current) {
      window.clearInterval(timer.current);
    }
    // 使用 current 属性设置 ref 的值
    timer.current = window.setInterval(() => {
      gameMain()
    }, gameLevel.Speed);
  }, []);

  const gameMainPage = () => {
    return (
      <>
        <div>
          {"gameArr: "}{JSON.stringify(arr)}
          {/* {"gameLevel: "}{JSON.stringify(gameLevel)} */}
          {/* {"gameGlobalRandmonNumber: "}{JSON.stringify(gameGlobalRandmonNumber)} */}
        </div>
        <div>{randomNum}</div>
        {/* <Button onClick={() => {
          handleStart()
        }}>start</Button>
        <Button onClick={() => {
          handlePause()
        }}>pause</Button> */}
      </>
    )
  }

  const gameinitPage = () => {
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

  const buttonShowContrller = (gameState: string) => {
    if (gameState === GAME_INIT) {
      return gameinitPage()
    }
    if (gameState === GAME_DIFFICULTY_CHOSE_SATE) {
      return (
        <Button type="primary" onClick={() => {
          setGameState(GAME_START)
          setGameLevel(GMAE_LEVEL[0])
          setGameGlobalRandomNumber(randomNumFunc(10, 15))
        }}>关卡1</Button>
      )
    }
    if (gameState === GAME_START) {
      handleStart()
      return gameMainPage()
    }
    if (gameState === GAME_END) {
      return gameinitPage()
    }
  }

  return (
    <div>
      {buttonShowContrller(gameState)}
    </div>
  );
}