import React, { useState } from 'react';
import { fetchAdvancedUsers } from '../services/githubService';

const Search = () => {
  const [form, setForm] = useState({ username: '', location: '', repos: '' });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUsers([]);

    // Build search criteria, but call only fetchAdvancedUsers
    try {
      // If no criteria entered, prompt user
      if (!form.username && !form.location && !form.repos) {
        setError('Please enter a search value');
        setLoading(false);
        return;
      }

      const data = await fetchAdvancedUsers(form);

      if (!data.items || data.items.length === 0) {
        setError("Looks like we can't find the user");
      } else {
        setUsers(data.items);
      }
    } catch (err) {
      setError("Looks like we can't find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          type="text"
          placeholder="Username (optional)"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          type="text"
          placeholder="Location"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <input
          name="repos"
          value={form.repos}
          onChange={handleChange}
          type="number"
          placeholder="Min public repos"
          className="w-full border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4 text-gray-600">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      {users.length > 0 && (
        <div className="mt-6 space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-4 border p-4 rounded shadow-sm"
            >
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-semibold text-lg">{user.login}</p>
                <a
                  href={user.html_url}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
