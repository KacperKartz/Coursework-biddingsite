import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className='countdownTimer'>
      
      <span><h6 id="timerD">{String(timeLeft.days).padStart(2, '0')}</h6><p>days</p></span>
      <span><h6 id="timerH">{String(timeLeft.hours).padStart(2, '0')}</h6><p>hrs</p></span>
      <span><h6 id="timerM">{String(timeLeft.minutes).padStart(2, '0')}</h6><p>min</p></span>
      <span><h6 id="timerS">{String(timeLeft.seconds).padStart(2, '0')}</h6><p>sec</p></span>
    </div>
  );
};

export default CountdownTimer;