import { useEffect, useState } from 'react';
import { itemService } from '../services/itemService';
import { Link } from 'react-router-dom';
import '../App.css';

export function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadItems = () => {
    setLoading(true);
    itemService.getAll()
      .then(data => setItems(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;

    try {
      await itemService.delete(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      alert('Erro ao deletar o item.');
    }
  };

  return (
    <div className="container">
      <h1>Lista de Itens</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <Link to="/new" className="btn">+ Novo Item</Link>
        <Link to="/search" className="btn btn-secondary">Buscar por Nome</Link>
      </div>

      {loading ? <p>Carregando dados...</p> : items.length === 0 ? (
        <p>Nenhum item cadastrado ainda.</p>
      ) : (
        <ul className="item-list">
          {items.map(item => (
            <li key={item.id} className="item-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <small>Criado em: {new Date(item.created_at).toLocaleString()}</small>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link 
                  to={`/edit/${item.id}`} 
                  className="btn" 
                  style={{ background: '#ffc107', color: '#000', padding: '8px 12px', textDecoration: 'none', borderRadius: '4px', fontSize: '0.9rem', width: 'auto' }}
                >
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' }}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}