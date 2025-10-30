
import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 overflow-hidden">
      <div 
        className="bg-secondary h-4 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clampedProgress}%` }}>
      </div>
    </div>
  );
};

export default ProgressBar;
