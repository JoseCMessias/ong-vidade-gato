import { useState } from 'react';
import { itemService } from '../services/itemService';
import { Link } from 'react-router-dom';
import '../App.css';

export function ItemSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const data = await itemService.getAll(searchTerm);
      setItems(data);
      setSearched(true);
    } catch (error) {
      alert('Erro ao buscar o item.');
    }
  };

  return (
    <div className="container">
      <h1>Buscar Item por Nome</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <Link to="/" className="btn btn-secondary">Voltar</Link>
      </div>

      <form onSubmit={handleSearch} className="form-group" style={{ flexDirection: 'row' }}>
        <input 
          type="text" 
          placeholder="Digite o nome do item..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)}
          className="input-field"
          required
        />
        <button type="submit" className="btn" style={{ width: 'auto' }}>Pesquisar</button>
      </form>

      {searched && (
        <ul className="item-list" style={{ marginTop: '20px' }}>
          {items.length === 0 ? (
            <p>Nenhum item encontrado com esse nome.</p>
          ) : (
            items.map(item => (
              <li key={item.id} className="item-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <small>Criado em: {new Date(item.created_at).toLocaleString()}</small>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}