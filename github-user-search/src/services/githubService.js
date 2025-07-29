import axios from 'axios';

export const fetchAdvancedUsers = async ({ username, location, minRepos }) => {
  let query = '';

  if (username) query += `${username} in:login `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const response = await axios.get(
    `https://api.github.com/search/users?q=${encodeURIComponent(query.trim())}&per_page=10`
  );

  return response.data;
};
const token = import.meta.env.VITE_GITHUB_API_KEY;

const headers = token
  ? { Authorization: `token ${token}` }
  : {};

const response = await axios.get(url, { headers });
