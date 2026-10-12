import { ItemModel } from '../models/item.model.js';

export const ItemController = {
  async getItems(req, res) {
    try {
      const items = await ItemModel.findAll();
      return res.status(200).json({ success: true, data: items });
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
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
  }
};