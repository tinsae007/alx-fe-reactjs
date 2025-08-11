import React from 'react';

function CurrencySelector({ label, value, onChange, options }) {
  return (
    <div className="flex-1">
      <label className="block mb-1">{label}</label>
      <select className="w-full p-2 border rounded" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelector;
