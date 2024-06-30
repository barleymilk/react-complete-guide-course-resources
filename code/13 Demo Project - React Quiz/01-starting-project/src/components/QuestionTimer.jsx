import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    console.log("SETTING TIMEOUT");
    const timer = setTimeout(onTimeout, timeout); // setInterval에 의해 재렌더링될 때마다 타이머 세팅 -> 다수의 타이머 실행 -> useEffect

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]); // 부모 컴포넌트가 QuestionTimer의 timeout이 변경되어야 하는지 결정하기 때문에

  useEffect(() => {
    console.log("SETTING INTERVAL");
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100); // 무한루프 발생 -> useEffect

    return () => {
      clearInterval(interval);
    }; // 클린업 함수: 해당 Effect 함수를 다시 작동하기 전이나 컴포넌트가 DOM으로부터 삭제될 때 리액트에 의해 자동으로 실행
  }, []);

  return <progress id="question-time" max={timeout} value={remainingTime} />;
}
