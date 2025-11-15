
import React from 'react';

interface CalculatorDisplayProps {
  value: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ value }) => {
  const formattedValue = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 10
  }).format(parseFloat(value) || 0);

  return (
    <div className="bg-black text-white text-right p-4 rounded-lg mb-4 h-24 flex items-end justify-end">
      <h1 className="text-6xl font-light break-all">{value}</h1>
    </div>
  );
};

export default CalculatorDisplay;
