import React from 'react';

function ResultDisplay({ result, error, isLoading }) {
  return (
    <div className="mt-4">
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {result !== null && result !== undefined && (
        <p className="text-lg font-bold">Converted Amount: {result.toFixed(2)}</p>
      )}
    </div>
  );
}

export default ResultDisplay;
