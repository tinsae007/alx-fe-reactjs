import React, { useState } from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import DarkModeToggle from './components/DarkModeToggle';
import HistoricalChart from './components/HistoricalChart';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');

  // Pass currency states to HistoricalChart and update on CurrencyConverter conversion

  // To sync currencies with HistoricalChart, you might want to lift up the state from CurrencyConverter,
  // but for now, I will just keep a minimal sync example below

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Currency Converter</h1>
          <DarkModeToggle />
        </div>

        <CurrencyConverter
          onCurrencyChange={(from, to) => {
            setBaseCurrency(from);
            setTargetCurrency(to);
          }}
          onAmountConvert={(from, to) => {
            setBaseCurrency(from);
            setTargetCurrency(to);
          }}
        />

        <h2 className="mt-10 mb-4 text-xl font-semibold">Historical Exchange Rates (Past 7 days)</h2>
        <HistoricalChart base={baseCurrency} target={targetCurrency} />
      </div>
    </div>
  );
}

export default App;
