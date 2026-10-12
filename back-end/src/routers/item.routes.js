import { Router } from 'express';
import { ItemController } from '../controllers/item.controller.js';

const router = Router();

router.get('/items', ItemController.getItems);
router.post('/items', ItemController.createItem);

export default router;