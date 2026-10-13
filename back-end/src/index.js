import express from 'express';
import cors from 'cors';
import itemRoutes from './routers/item.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', itemRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

export default app;