import React, { useState, useEffect } from 'react';
import CurrencySelector from './CurrencySelector';
import ResultDisplay from './ResultDisplay';

function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [converted, setConverted] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const [lang, setLang] = useState('en');
  const translations = {
    en: { amount: 'Amount', from: 'From', to: 'To', convert: 'Convert', clear: 'Clear' },
    es: { amount: 'Cantidad', from: 'Desde', to: 'Hacia', convert: 'Convertir', clear: 'Limpiar' },
  };

  useEffect(() => {
    fetch('https://api.exchangerate.host/symbols')
      .then(res => res.json())
      .then(data => {
        setCurrencies(Object.keys(data.symbols));
      });
  }, []);

  const handleConvert = async () => {
    if (!amount || isNaN(amount)) {
      setError(lang === 'en' ? 'Please enter a valid number' : 'Por favor ingrese un número válido');
      setConverted(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
      );
      const data = await response.json();
      setConverted(data.result);
    } catch (err) {
      setError(lang === 'en' ? 'Something went wrong.' : 'Ocurrió un error.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setAmount('');
    setConverted(null);
    setError(null);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <div className="flex justify-end mb-4">
        <button
          className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded"
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
        >
          {lang === 'en' ? 'Español' : 'English'}
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-1">{translations[lang].amount}</label>
        <input
          className="w-full p-2 border rounded"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="flex gap-4 mb-4">
        <CurrencySelector
          label={translations[lang].from}
          value={fromCurrency}
          onChange={setFromCurrency}
          options={currencies}
        />
        <CurrencySelector
          label={translations[lang].to}
          value={toCurrency}
          onChange={setToCurrency}
          options={currencies}
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleConvert}>
          {translations[lang].convert}
        </button>
        <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={handleClear}>
          {translations[lang].clear}
        </button>
      </div>

      <ResultDisplay result={converted} error={error} isLoading={isLoading} />
    </div>
  );
}

export default CurrencyConverter;
