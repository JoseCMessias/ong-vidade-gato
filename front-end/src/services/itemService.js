const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const itemService = {
  async getAll(searchName = '') {
    const url = searchName ? `${API_URL}/items?name=${encodeURIComponent(searchName)}` : `${API_URL}/items`;
    const response = await fetch(url);
    const result = await response.json();
    return result.success ? result.data : [];
  },

  async getById(id) {
    const response = await fetch(`${API_URL}/items/${id}`);
    const result = await response.json();
    if (!result.success) throw new Error(result.error);
    return result.data;
  },

  async create(itemData) {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error);
    return result.data;
  },

  async update(id, itemData) {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error);
    return result.data;
  },

  async delete(id) {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.error);
    return result.data;
  }
};