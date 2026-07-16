import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

export function useCountdown(target: Date): Countdown {
  const calc = (): Countdown => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      done: false,
    };
  };

  const [countdown, setCountdown] = useState<Countdown>(calc);

  useEffect(() => {
    const id = setInterval(() => setCountdown(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.getTime()]);

  return countdown;
}
