import { useEffect, useState } from 'react';
import { itemService } from '../services/itemService';
import { Link } from 'react-router-dom';
import '../App.css';

export function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    itemService.getAll()
      .then(data => setItems(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1>Lista de Itens</h1>
      <Link to="/new" className="btn" style={{ marginBottom: '20px', display: 'inline-block' }}>
        + Novo Item
      </Link>

      {loading ? <p>Carregando dados...</p> : items.length === 0 ? (
        <p>Nenhum item cadastrado ainda.</p>
      ) : (
        <ul className="item-list">
          {items.map(item => (
            <li key={item.id} className="item-card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <small>Criado em: {new Date(item.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}