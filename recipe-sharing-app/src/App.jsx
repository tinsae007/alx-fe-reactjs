// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar'; // ✅ Import SearchBar
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';


function App() {
  return (
    <Routes>
  <Route
    path="/"
    element={
      <>
        <SearchBar />
        <AddRecipeForm />
        <RecipeList />
        <FavoritesList /> {/* ✅ Add favorites section */}
        <RecommendationsList /> {/* ✅ Add recommendations section */}
      </>
    }
  />
  <Route path="/recipes/:id" element={<RecipeDetails />} />
</Routes>

  );
}

export default App;
