
import React from 'react';

interface CalculatorButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({ onClick, children, className }) => {
  const baseClasses = "text-3xl rounded-full h-20 w-full flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-orange-500";
  const defaultClasses = "bg-gray-700 hover:bg-gray-600";
  
  return (
    <button onClick={onClick} className={`${baseClasses} ${className || defaultClasses}`}>
      {children}
    </button>
  );
};

export default CalculatorButton;
