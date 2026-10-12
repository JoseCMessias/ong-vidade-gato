import { Router } from 'express';
import { ItemController } from '../controllers/item.controller.js';

const router = Router();

router.get('/items', ItemController.getItems);
router.get('/items/:id', ItemController.getItemById);
router.post('/items', ItemController.createItem);
router.put('/items/:id', ItemController.updateItem);
router.delete('/items/:id', ItemController.deleteItem);

export default router;