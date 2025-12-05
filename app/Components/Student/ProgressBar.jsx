"use client";

const ProgressBar = ({ progress, className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
