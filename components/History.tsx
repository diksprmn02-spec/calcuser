
import React from 'react';

interface HistoryProps {
  history: string[];
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onClear }) => {
  return (
    <div className="w-full max-w-sm md:max-w-xs h-96 bg-gray-800 rounded-3xl shadow-lg p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-200">Riwayat</h2>
        <button 
          onClick={onClear} 
          className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
          disabled={history.length === 0}
        >
          Bersihkan
        </button>
      </div>
      <div className="flex-grow overflow-y-auto pr-2">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">Belum ada riwayat perhitungan.</p>
        ) : (
          <ul className="space-y-2 text-right">
            {history.map((item, index) => (
              <li key={index} className="text-gray-400 text-lg break-words">
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default History;
