import { Typography } from '@mui/material';
import { AppColors } from '@theme/schemes/AppPersonalColor';

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

interface TimerProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

/**
 *
 * @param param0 time : 단위 초
 * @returns
 */
const Timer = ({ time = 300, setTime }: TimerProps) => {
  const [min, setMin] = useState(Math.floor(time / 60));
  const [sec, setSec] = useState(time % 60);

  const timerId = useRef<any>();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTime((prev) => prev - 1);
      setMin(Math.floor(time / 60));
      setSec(time % 60);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, [time]);

  useEffect(() => {
    if (time < 0) {
      clearInterval(timerId.current);
    }
  }, [sec]);

  // return <TimerText>{`${min}:${sec < 10 ? `0${sec}` : sec}`}</TimerText>;
  return (
    <Typography
      component='time'
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        fontSize: '13px',
        color: AppColors.black40,
      }}>{`${min}:${String(sec).padStart(2, '0')}`}</Typography>
  );
};

export default Timer;
