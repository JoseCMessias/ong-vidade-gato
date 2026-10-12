import express from 'express';
import cors from 'cors';
import itemRoutes from './routers/item.routes.js';

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Registro de Rotas
app.use('/api', itemRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Se estiver rodando localmente na sua máquina, sobe o servidor na porta 3000
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor local rodando na porta ${PORT}`);
  });
}

// Exportação obrigatória para a Vercel processar como Serverless Function
export default app;