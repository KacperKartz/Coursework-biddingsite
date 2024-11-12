import React, { useState, useEffect } from 'react';

const AuctionEndTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      if (difference < 3600000) {  // Less than 1 hour (in milliseconds)
        // Show minutes and seconds if less than 1 hour
        timeLeft = {
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        // Show days and hours if more than 1 hour
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        };
      }
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
    <div className='AuctionEndTimer'>
      {/* If days and hours are available (more than 1 hour remaining), show days and hours */}
      {timeLeft.days !== undefined && timeLeft.hours !== undefined && timeLeft.days >= 1 ? (
        <p> - {String(timeLeft.days)} days {String(timeLeft.hours)} hrs left</p>
      ) : (
        // If less than 1 hour, show minutes and seconds
        <p> - {String(timeLeft.minutes)} mins {String(timeLeft.seconds)} secs left</p>
      )}
    </div>
  );
};

export default AuctionEndTimer;
