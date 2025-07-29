import React from 'react';
import Search from './components/Search';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center py-6 text-blue-700">
        GitHub User Search
      </h1>
      <Search />
    </div>
  );
};

export default App;
