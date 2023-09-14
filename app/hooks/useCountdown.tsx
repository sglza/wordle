import { useEffect, useState } from "react";

interface Time {
  minutes: string,
  seconds: string
}

export const useCountdown = (futureDate: Date): Time => {
  const [time, setTime] = useState<Time>({ minutes: '00', seconds: '00' });

  useEffect(() => {

    const calculateTime = () => {
      const now: Date = new Date();
      const timeDifference: number = futureDate.getTime() - now.getTime();

      // The date has already passed
      if (timeDifference <= 0) {
        setTime({ minutes: '00', seconds: '00' });
        return;
      }

      const remainingMinutes = Math.floor(timeDifference / (1000 * 60)).toString();
      const remainingSeconds = Math.floor((timeDifference % (1000 * 60)) / 1000).toString();

      setTime({ minutes: remainingMinutes.padStart(2, '0'), seconds: remainingSeconds.padStart(2, '0') });
    }

    // Set up an interval to select a new word every minute
    const intervalId = setInterval(calculateTime, 100);

    return () => {
      // Clear the interval on component unmount to avoid memory leaks
      clearInterval(intervalId);
    };
  }, [futureDate]);

  return time;
};