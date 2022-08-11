import React, { useEffect, memo } from 'react';

interface TimeProps {
  timeRemain: number;
  setTimeRemain: React.Dispatch<React.SetStateAction<number>>;
}

const CountDowntime = (props: TimeProps) => {
  const { timeRemain, setTimeRemain } = props;
  const hours = Math.floor(timeRemain / 3600);
  const minutes = Math.floor((timeRemain - hours * 3600) / 60);
  const seconds = timeRemain - minutes * 60 - hours * 3600;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemain((time) => (time > 0 ? time - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [setTimeRemain]);

  return (
    <>
      {hours > 0 && (hours < 10 ? '0' + hours : hours) + ':'}
      {(minutes < 10 ? '0' + minutes : minutes) + ':'}
      {seconds < 10 ? '0' + seconds : seconds}
    </>
  );
};

export default memo(CountDowntime);
