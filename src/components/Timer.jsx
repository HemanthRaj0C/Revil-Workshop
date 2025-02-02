import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const Timer = ({ 
  initialDuration = 600,
  onTimeEnd,
  autoStart = true,
  format = 'MM:SS',
  warningTime = 60,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (timeLeft === 0 && onTimeEnd) {
      onTimeEnd();
    }
  }, [timeLeft, onTimeEnd]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    switch (format) {
      case 'HH:MM:SS':
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      case 'SS':
        return String(seconds);
      case 'MM:SS':
      default:
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
  }, [format]);

  const getTimerColor = useCallback(() => {
    if (timeLeft <= warningTime) {
      return 'text-red-400';
    }
    return 'text-cyan-400';
  }, [timeLeft, warningTime]);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimeLeft(initialDuration);
    setIsRunning(autoStart);
    setIsPaused(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4"
    >
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-4xl font-mono ${getTimerColor()} cursor-pointer`}
        onClick={handlePauseResume}
        title={isPaused ? "Click to resume" : "Click to pause"}
      >
        {formatTime(timeLeft)}
      </motion.div>
      <div className="flex gap-2">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePauseResume}
          className="px-2 py-1 rounded bg-gray-800 text-sm hover:bg-gray-700"
        >
          {isPaused ? "Resume" : "Pause"}
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleReset}
          className="px-2 py-1 rounded bg-gray-800 text-sm hover:bg-gray-700"
        >
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Timer;
