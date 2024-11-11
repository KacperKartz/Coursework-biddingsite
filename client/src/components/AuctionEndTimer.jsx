import React, { useState, useEffect } from 'react';

const AuctionEndTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      };
    } else {
      timeLeft = { days: 0, hours: 0 };
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
    <div className='AuctionEndTimer'>
      <p> - {String(timeLeft.days)} days {String(timeLeft.hours)} hrs left</p>
    </div>
  );
};

export default AuctionEndTimer;
