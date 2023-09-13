import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  onProgressBarChange: (progress: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  onProgressBarChange,
}) => {
  const controls = useAnimation();
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (event: MouseEvent) => {
        const progressBar = progressBarRef.current;

        if (progressBar) {
          const progressBarWidth = progressBar.offsetWidth;
          const newProgress = (event.clientX / progressBarWidth) * 100;
          onProgressBarChange(newProgress);
          controls.start({ width: `${newProgress}%` });
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging, onProgressBarChange, controls]);

  return (
    <div
      className="w-full h-4 bg-gray-300 rounded-lg overflow-hidden cursor-pointer"
      onMouseDown={() => setIsDragging(true)}
      ref={progressBarRef}
    >
      <motion.div
        className="h-full bg-blue-500"
        style={{ width: `${progress}%` }}
        animate={controls}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
