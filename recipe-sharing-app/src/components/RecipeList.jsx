import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes); // ✅ Changed
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const startEditing = (recipe) => {
    setEditingId(recipe.id);
    setEditTitle(recipe.title);
    setEditDescription(recipe.description);
  };

  const handleUpdate = () => {
    updateRecipe({ id: editingId, title: editTitle, description: editDescription });
    setEditingId(null);
  };

  return (
    <div>
      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
            {editingId === recipe.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{recipe.title}</h3>
                <p>{recipe.description}</p>
                <button onClick={() => startEditing(recipe)}>Edit</button>
                <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
