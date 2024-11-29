import React, { useState, useEffect } from "react";

const CountdownToSurvey = () => {
  const goLiveDate = new Date("2024-12-04T00:00:00");
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  const [isLive, setIsLive] = useState(false);

  // Calculate the largest remaining time unit
  function calculateTimeRemaining() {
    const now = new Date();
    const difference = goLiveDate - now;

    if (difference <= 0) {
      return null; // Countdown is over
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    // Determine the largest unit to display
    if (days > 0) {
      return { value: days, unit: "day" + (days > 1 ? "s" : "") };
    } else if (hours > 0) {
      return { value: hours, unit: "hour" + (hours > 1 ? "s" : "") };
    } else if (minutes > 0) {
      return { value: minutes, unit: "minute" + (minutes > 1 ? "s" : "") };
    } else {
      return { value: seconds, unit: "second" + (seconds > 1 ? "s" : "") };
    }
  }

  // Update the countdown every second
  useEffect(() => {
    if (timeRemaining === null) {
      setIsLive(true);
      return;
    }

    const interval = setInterval(() => {
      const newTime = calculateTimeRemaining();
      if (newTime === null) {
        setIsLive(true);
        clearInterval(interval);
      } else {
        setTimeRemaining(newTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  if (isLive) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Take the survey"
        className="text-white flex flex-row gap-2 items-center bg-white bg-opacity-25 py-2 px-4 rounded-full border-solid border-[1px] border-white hover:scale-105 transition-all active:scale-95"
        href="https://datamaturity.dataorchard.org.uk/20-minute/sign-up/9caaec2a-fc00-4fb8-9b34-dae394f46ec8"
      >
        Take the survey
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-5"
        >
          <path
            fillRule="evenodd"
            d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    );
  }

  return (
    <div className="text-white/70 flex flex-row gap-2 items-center bg-white bg-opacity-25 py-2 px-4 rounded-full border-solid border-[1px] border-white/30">
      Survey launching in{" "}
      {timeRemaining && (
        <span>
          {timeRemaining.value} {timeRemaining.unit}
        </span>
      )}
    </div>
  );
};

export default CountdownToSurvey;