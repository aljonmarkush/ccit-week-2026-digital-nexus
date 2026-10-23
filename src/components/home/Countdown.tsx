"use client";
import { useEffect, useState } from "react";

export default function Countdown() {
  // Set your official event target date here (e.g., CCIT Week kickoff)
  const targetDate = new Date("2026-11-15T08:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown">
      <div>
        <strong>{String(timeLeft.days).padStart(2, "0")}</strong>
        <span>DAYS</span>
      </div>
      <b>:</b>
      <div>
        <strong>{String(timeLeft.hours).padStart(2, "0")}</strong>
        <span>HRS</span>
      </div>
      <b>:</b>
      <div>
        <strong>{String(timeLeft.minutes).padStart(2, "0")}</strong>
        <span>MIN</span>
      </div>
      <b>:</b>
      <div>
        <strong>{String(timeLeft.seconds).padStart(2, "0")}</strong>
        <span>SEC</span>
      </div>
      <p className="countdown-note">OFFICIAL KICKOFF COUNTDOWN</p>
    </div>
  );
}