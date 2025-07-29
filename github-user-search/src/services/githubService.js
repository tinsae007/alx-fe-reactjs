import axios from 'axios';

const token = import.meta.env.VITE_GITHUB_API_KEY;
const headers = token ? { Authorization: `token ${token}` } : {};

export const fetchUserData = async ({ username, location, minRepos }) => {
  let query = '';

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const url = `https://api.github.com/search/users?q=${encodeURIComponent(query.trim())}&per_page=10`;

  const response = await axios.get(url, { headers });
  return response.data;
};
