import { ItemModel } from '../models/item.model.js';

export const ItemController = {
  async getItems(req, res) {
    try {
      const { name } = req.query;
      const items = name ? await ItemModel.findByName(name) : await ItemModel.findAll();
      return res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      return res.status(500).json({ success: false, error: 'Erro interno no servidor' });
    }
  },

  async getItemById(req, res) {
    try {
      const { id } = req.params;
      const item = await ItemModel.findById(id);

      if (!item) {
        return res.status(404).json({ success: false, error: 'Item não encontrado' });
      }

      return res.status(200).json({ success: true, data: item });
    } catch (error) {
      console.error('Erro ao buscar item:', error);
      return res.status(500).json({ success: false, error: 'Erro interno no servidor' });
    }
  },

  async createItem(req, res) {
    try {
      const { name, description } = req.body;
      if (!name) {
        return res.status(400).json({ success: false, error: 'O campo "name" é obrigatório' });
      }
      const newItem = await ItemModel.create(name, description);
      return res.status(201).json({ success: true, data: newItem });
    } catch (error) {
      console.error('Erro ao criar item:', error);
      return res.status(500).json({ success: false, error: 'Erro interno no servidor' });
    }
  },

  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({ success: false, error: 'O campo "name" é obrigatório' });
      }

      const updatedItem = await ItemModel.update(id, name, description);

      if (!updatedItem) {
        return res.status(404).json({ success: false, error: 'Item não encontrado' });
      }

      return res.status(200).json({ success: true, data: updatedItem });
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      return res.status(500).json({ success: false, error: 'Erro interno no servidor' });
    }
  },

  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const deletedItem = await ItemModel.delete(id);

      if (!deletedItem) {
        return res.status(404).json({ success: false, error: 'Item não encontrado' });
      }

      return res.status(200).json({ success: true, data: deletedItem });
    } catch (error) {
      console.error('Erro ao deletar item:', error);
      return res.status(500).json({ success: false, error: 'Erro interno no servidor' });
    }
  }
};