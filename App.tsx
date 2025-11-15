
import React, { useState } from 'react';
import CalculatorDisplay from './components/CalculatorDisplay';
import CalculatorButton from './components/CalculatorButton';
import History from './components/History';
import { Operator } from './types';

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };
  
  const clearHistory = () => {
    setHistory([]);
  };

  const performOperation = (nextOperator: Operator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      const resultStr = `${parseFloat(result.toFixed(7))}`;
      setDisplayValue(resultStr);
      setFirstOperand(result);
      setHistory(prev => [...prev, `${firstOperand} ${operator} ${inputValue} = ${resultStr}`]);
    }
    
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };
  
  const handleEquals = () => {
     const inputValue = parseFloat(displayValue);
     if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, inputValue, operator);
        const resultStr = `${parseFloat(result.toFixed(7))}`;
        setDisplayValue(resultStr);
        setHistory(prev => [...prev, `${firstOperand} ${operator} ${inputValue} = ${resultStr}`]);
        setFirstOperand(null); // Reset for new calculation
        setOperator(null);
        setWaitingForSecondOperand(true);
     }
  };

  const calculate = (first: number, second: number, op: Operator): number => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second;
    }
  };
  
  const toggleSign = () => {
    setDisplayValue((prev) => (parseFloat(prev) * -1).toString());
  };

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);
    setDisplayValue((currentValue / 100).toString());
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center p-4 gap-8 bg-gray-900 text-white font-sans">
        <div className="w-full max-w-sm mx-auto bg-black rounded-3xl shadow-lg p-6 space-y-4">
            <CalculatorDisplay value={displayValue} />
            <div className="grid grid-cols-4 gap-3">
                <CalculatorButton onClick={clearAll} className="bg-gray-400 text-black hover:bg-gray-300">AC</CalculatorButton>
                <CalculatorButton onClick={toggleSign} className="bg-gray-400 text-black hover:bg-gray-300">+/-</CalculatorButton>
                <CalculatorButton onClick={inputPercent} className="bg-gray-400 text-black hover:bg-gray-300">%</CalculatorButton>
                <CalculatorButton onClick={() => performOperation('/')} className="bg-orange-500 hover:bg-orange-400 text-white">÷</CalculatorButton>

                <CalculatorButton onClick={() => inputDigit('7')}>7</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('8')}>8</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('9')}>9</CalculatorButton>
                <CalculatorButton onClick={() => performOperation('*')} className="bg-orange-500 hover:bg-orange-400 text-white">×</CalculatorButton>

                <CalculatorButton onClick={() => inputDigit('4')}>4</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('5')}>5</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('6')}>6</CalculatorButton>
                <CalculatorButton onClick={() => performOperation('-')} className="bg-orange-500 hover:bg-orange-400 text-white">−</CalculatorButton>

                <CalculatorButton onClick={() => inputDigit('1')}>1</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('2')}>2</CalculatorButton>
                <CalculatorButton onClick={() => inputDigit('3')}>3</CalculatorButton>
                <CalculatorButton onClick={() => performOperation('+')} className="bg-orange-500 hover:bg-orange-400 text-white">+</CalculatorButton>

                <CalculatorButton onClick={() => inputDigit('0')} className="col-span-2">0</CalculatorButton>
                <CalculatorButton onClick={inputDecimal}>,</CalculatorButton>
                <CalculatorButton onClick={handleEquals} className="bg-orange-500 hover:bg-orange-400 text-white">=</CalculatorButton>
            </div>
        </div>
        <History history={history} onClear={clearHistory} />
    </div>
  );
};

export default App;
