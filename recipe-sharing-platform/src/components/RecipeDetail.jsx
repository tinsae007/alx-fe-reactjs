import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = data.find((r) => r.id === parseInt(id, 10));
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Recipe not found.</p>
        <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md my-8">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
      <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <p className="text-gray-700 mb-6">{recipe.summary}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx} className="text-gray-600">{ingredient}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          {recipe.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default RecipeDetail;
