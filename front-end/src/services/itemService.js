const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const itemService = {
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/items`);
      const result = await response.json();
      return result.success ? result.data : [];
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      throw error;
    }
  },

  async create(itemData) {
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error);
      return result.data;
    } catch (error) {
      console.error('Erro ao criar item:', error);
      throw error;
    }
  }
};